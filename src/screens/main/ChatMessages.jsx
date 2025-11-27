// /* eslint-disable react-native/no-inline-styles */
// import React from 'react';
// import Background from '../../utils/Background';
// import ChatCom from '../../components/ChatCom';
// import { KeyboardAvoidingView } from 'react-native';
// import { responsiveHeight } from '../../utils/Responsive_Dimensions';

// const ChatMessages = () => {
//   return (
//     <KeyboardAvoidingView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}} behavior="height">
//       <Background contentContainerStyle={{ flex: 1, paddingBottom: responsiveHeight(1) }}>
// <ChatCom />
//       </Background>
//     </KeyboardAvoidingView>
//   );
// };

// export default ChatMessages;

/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import { ImageBaseUrl } from '../../assets/Utils/BaseUrl';
import Background from '../../utils/Background';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import AppColors from '../../utils/AppColors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import APPImages from '../../assets/APPImages';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ChatMessages = ({ route, navigation }) => {
  const { receiverId, receiverName, receiverImage } = route.params;
  const {
    _id: currentUserId,
    username,
    image,
  } = useSelector(state => state.user.userData);
  console.log('receiverName', receiverName);
  console.log('receiverImage', receiverImage);

  // Set header title only once when component mounts
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: receiverName || 'Chat',
      headerRight: () =>
        receiverImage ? (
          <Image
            source={{ uri: `${ImageBaseUrl}${receiverImage}` }}
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              marginRight: 10,
            }}
          />
        ) : null,
    });
  }, []); // Empty dependency array - run only once

  const chatId =
    currentUserId > receiverId
      ? `${receiverId}_${currentUserId}`
      : `${currentUserId}_${receiverId}`;

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  // 🔹 Send Message
  // 🔹 Send Message - BULLETPROOF VERSION
  const sendMessage = async () => {
    if (!inputText.trim() || !currentUserId) return;

    try {
      // 🔥 CREATE A CLEAN MESSAGE OBJECT
      const message = {};

      // Add only defined values
      if (inputText.trim()) message.text = inputText.trim();
      if (currentUserId) message.senderId = currentUserId;
      if (username) message.senderName = username;
      if (image) message.senderImage = image;
      if (receiverId) message.receiverId = receiverId;
      if (receiverName) message.receiverName = receiverName;
      if (receiverImage) message.receiverImage = receiverImage;

      message.createdAt = firestore.FieldValue.serverTimestamp();
      message.seen = false;

      console.log('🔍 Final message object:', receiverImage);

      const chatRef = firestore().collection('chats').doc(chatId);

      // Send message
      await chatRef.collection('messages').add(message);

      // 🔥 CREATE CLEAN CHAT DATA
      const chatData = {
        participants: [currentUserId, receiverId].filter(Boolean),
        lastMessage: inputText.trim(),
        lastMessageTime: firestore.FieldValue.serverTimestamp(),
      };

      // Only add participant data if available
      if (username || receiverName) {
        chatData.participantNames = {};
        if (username) chatData.participantNames[currentUserId] = username;
        if (receiverName) chatData.participantNames[receiverId] = receiverName;
      }

      if (image || receiverImage) {
        chatData.participantImages = {};
        if (image) chatData.participantImages[currentUserId] = image;
        if (receiverImage)
          chatData.participantImages[receiverId] = receiverImage;
      }

      console.log('🔍 Final chat data:', chatData);

      // Update chat document
      await chatRef.set(chatData, { merge: true });

      setInputText('');
    } catch (error) {
      console.log('🔥 Send message error:', error);
    }
  };

  // 🔹 Listen to messages (real-time) with useCallback to prevent recreating
  const messageListener = useCallback(() => {
    if (!currentUserId) return;

    const unsubscribe = firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('createdAt', 'asc')
      .onSnapshot(
        async snapshot => {
          if (!snapshot.empty) {
            const msgs = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
            setMessages(msgs);

            // Mark unseen messages from receiver as seen
            const unseenMsgs = snapshot.docs.filter(
              doc =>
                doc.data().senderId !== currentUserId &&
                doc.data().seen === false,
            );

            if (unseenMsgs.length > 0) {
              const batch = firestore().batch();
              unseenMsgs.forEach(doc => {
                batch.update(doc.ref, { seen: true });
              });
              try {
                await batch.commit();
              } catch (error) {
                console.log('🔥 Batch update error:', error);
              }
            }
          } else {
            setMessages([]);
          }
        },
        error => {
          console.log('🔥 Message listener error:', error);
        },
      );

    return unsubscribe;
  }, [chatId, currentUserId]);

  useEffect(() => {
    const unsubscribe = messageListener();
    return () => unsubscribe();
  }, [messageListener]);

  // 🔹 Render Message with memoization
  const renderMessage = useCallback(
    ({ item }) => {
      console.log('itemmmm', item);
      const isSender = item.senderId === currentUserId;
      return (
        <View
          style={{
            flexDirection: 'row',
            alignSelf: isSender ? 'flex-end' : 'flex-start',
            alignItems: 'flex-end',
            marginVertical: 4,
            marginHorizontal: 10,
            maxWidth: '75%',
          }}
        >
          {!isSender && item.senderImage && (
            <Image
              source={{ uri: `${ImageBaseUrl}${item.senderImage}` }}
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                marginRight: 5,
              }}
            />
          )}
          <View
            style={{
              backgroundColor: isSender ? '#DCF8C6' : '#E5E5E5',
              padding: 10,
              borderRadius: 10,
            }}
          >
            {!isSender && (
              <Text style={{ fontSize: 12, color: 'gray', marginBottom: 2 }}>
                {item.senderName || 'User'}
              </Text>
            )}
            <Text style={{ fontSize: 16 }}>{item.text}</Text>
            <Text style={{ fontSize: 10, color: 'gray', textAlign: 'right' }}>
              {item.createdAt && item.createdAt.toDate
                ? moment(item.createdAt.toDate()).format('hh:mm A')
                : '...'}
            </Text>
            {isSender && (
              <Text
                style={{ fontSize: 10, color: item.seen ? 'green' : 'gray' }}
              >
                {item.seen ? 'Seen' : 'Sent'}
              </Text>
            )}
          </View>
        </View>
      );
    },
    [currentUserId],
  );

  const keyExtractor = useCallback(item => item.id, []);

  if (!currentUserId) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Background
      contentContainerStyle={{
        flex: 1,
        paddingVertical: responsiveHeight(2),
      }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: responsiveWidth(4),
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FontAwesome6
                name="chevron-left"
                size={22}
                color={AppColors.WHITE}
              />
            </TouchableOpacity>
            <Image
              source={
                receiverImage
                  ? { uri: `${ImageBaseUrl}${receiverImage}` }
                  : APPImages.userDummy
              }
              style={styles.avatar}
            />
          </View>
          <View>
            <Text style={styles.name}>{receiverName}</Text>
            <Text style={styles.subText}>Salon</Text>
          </View>
        </View>
        <FlatList
          data={messages}
          keyExtractor={keyExtractor}
          renderItem={renderMessage}
          contentContainerStyle={{ paddingVertical: 10 }}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          windowSize={5}
        />
        <View
          style={[styles.inputContainer, { marginBottom: responsiveHeight(2) }]}
        >
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type Here"
            placeholderTextColor="#888"
            style={styles.input}
          />

          <View
            style={{
              flexDirection: 'row',
              gap: responsiveWidth(2),
              alignItems: 'center',
            }}
          >
            {/* <TouchableOpacity>
            <Entypo name="attachment" size={22} color={AppColors.BLACK} />
          </TouchableOpacity> */}

            <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
              <Icon name="send" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Background>
  );
};

export default ChatMessages;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderColor: AppColors.WHITE,
  },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  name: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  subText: { color: '#aaa', fontSize: 12 },
  messageContainer: {
    maxWidth: '70%',
    padding: 10,
    borderRadius: 12,
    marginBottom: 12,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#F5A623', // orange bubble
    borderBottomRightRadius: 0,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#2E1C78', // dark purple bubble
    borderBottomLeftRadius: 0,
  },
  messageText: { color: '#fff', fontSize: 14 },
  timeText: { fontSize: 10, color: '#ddd', marginTop: 4, textAlign: 'right' },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: responsiveHeight(1),
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#000',
    paddingHorizontal: 8,
    borderRadius: responsiveHeight(1),
  },
  sendButton: {
    backgroundColor: '#1A0B5C',
    padding: 10,
    borderRadius: 20,
    marginLeft: 8,
  },
});
