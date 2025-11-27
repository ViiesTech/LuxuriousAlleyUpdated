/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import Background from '../../utils/Background';
import AppHeader from '../../components/AppHeader';
import APPImages from '../../assets/APPImages';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import AppText from '../../components/AppTextComps/AppText';
import AppColors from '../../utils/AppColors';
import LineBreak from '../../components/LineBreak';
import { useSelector } from 'react-redux';
import { ImageBaseUrl } from '../../assets/Utils/BaseUrl';

const ChatList = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const { _id: currentUserId } = useSelector(state => state.user.userData);

  // 🔹 Fetch and listen to chat list in real time - SIMPLIFIED VERSION
  useEffect(() => {
    if (!currentUserId) {
      setLoading(false);
      return;
    }

    console.log('🔍 Current User ID for chat query:', currentUserId);

    const unsubscribe = firestore()
      .collection('chats')
      .where('participants', 'array-contains', currentUserId)
      .onSnapshot(
        snapshot => {
          console.log('📨 Firestore snapshot received');
          console.log('📊 Number of chats found:', snapshot.docs.length);

          if (snapshot && !snapshot.empty) {
            // SIMPLIFIED: Process chats without complex user data fetching
            const allChats = snapshot.docs.map(doc => {
              const chatData = doc.data();
              const chatId = doc.id;

              console.log('💬 Raw chat data:', {
                id: chatId,
                participants: chatData.participants,
                lastMessage: chatData.lastMessage,
                participantNames: chatData.participantNames,
                participantImages: chatData.participantImages,
              });

              // Find the other user ID
              const otherUserId = chatData.participants?.find(
                p => p !== currentUserId,
              );

              // Get user data from chat document if available
              const participantNames = chatData.participantNames || {};
              const participantImages = chatData.participantImages || {};

              const otherUserName =
                participantNames[otherUserId] ||
                `User ${otherUserId?.slice(-6)}`;
              const otherUserImage = participantImages[otherUserId] || null;

              return {
                id: chatId,
                ...chatData,
                otherUserId,
                otherUserName,
                otherUserImage,
              };
            });

            // Sort by lastMessageTime
            allChats.sort((a, b) => {
              const timeA = a.lastMessageTime?.toDate?.() || new Date(0);
              const timeB = b.lastMessageTime?.toDate?.() || new Date(0);
              return timeB - timeA;
            });

            console.log('✅ Processed chats:', allChats);
            setChats(allChats);
          } else {
            console.log('📭 No chats found in Firestore');
            setChats([]);
          }
          setLoading(false);
        },
        error => {
          console.log('🔥 Chat list error:', error);
          console.log('🔥 Error code:', error.code);
          console.log('🔥 Error message:', error.message);
          setLoading(false);
          setChats([]);
        },
      );

    return () => unsubscribe();
  }, [currentUserId]);

  const renderItem = ({ item }) => {
    const lastMessage = item.lastMessage || 'No messages yet';
    const lastMessageTime = item.lastMessageTime
      ? moment(item.lastMessageTime.toDate()).calendar(null, {
          sameDay: 'h:mm A',
          lastDay: '[Yesterday]',
          lastWeek: 'dddd',
          sameElse: 'DD/MM/YY',
        })
      : '';

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ChatMessages', {
            receiverId: item.otherUserId,
            receiverName: item.otherUserName,
            receiverImage: item.otherUserImage,
          })
        }
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 10,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: responsiveHeight(2),
            }}
          >
            <Image
              style={{
                height: responsiveHeight(7),
                width: responsiveWidth(14),
                borderRadius: responsiveHeight(3.5),
              }}
              source={
                item.otherUserImage
                  ? { uri: `${ImageBaseUrl}${item.otherUserImage}` }
                  : APPImages.userDummy
              }
            />
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <AppText
                  textFontWeight
                  textSize={2}
                  title={item.otherUserName}
                  textColor={AppColors.WHITE}
                />
                <AppText
                  title={lastMessageTime}
                  textColor={AppColors.WHITE}
                  textSize={1.5}
                />
              </View>

              <AppText
                textSize={2}
                numberOfLines={1}
                title={lastMessage}
                textColor={AppColors.WHITE}
              />
            </View>
          </View>
        </View>
        <LineBreak space={2} />
        <View style={{ borderWidth: 1.5, borderColor: AppColors.themeColor }} />
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <Background
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" color={AppColors.themeColor} />
        <AppText
          title="Loading chats..."
          textColor={AppColors.WHITE}
          style={{ marginTop: 10 }}
        />
      </Background>
    );
  }

  return (
    <Background
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: responsiveHeight(2),
      }}
    >
      <AppHeader onPress={() => navigation.goBack()} title={'Chats'} />
      <LineBreak space={2} />

      {chats.length === 0 ? (
        <View
          style={{
            flex: 0.5,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: responsiveHeight(10),
          }}
        >
          <AppText
            title="No chats yet"
            textColor={AppColors.WHITE}
            textSize={2.2}
          />
          <AppText
            title="Start a conversation to see chats here"
            textColor={AppColors.WHITE}
            textSize={1.7}
            style={{ marginTop: 10 }}
          />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={{ gap: responsiveHeight(2) }}
          data={chats}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      )}
    </Background>
  );
};

export default ChatList;
