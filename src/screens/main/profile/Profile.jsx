/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Image, FlatList, TouchableOpacity, Switch } from 'react-native';
import AppColors from '../../../utils/AppColors';
import { useNavigation } from '@react-navigation/native';
import AppHeader from '../../../components/AppHeader';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';
import AppText from '../../../components/AppTextComps/AppText';
import APPImages from '../../../assets/APPImages';
import LineBreak from '../../../components/LineBreak';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Background from '../../../utils/Background';
import { Color } from '../../../utils/Colors';
import StyleButton from '../../../components/StyleButton';
import { useDispatch, useSelector } from 'react-redux';
import { clearToken } from '../../../redux/Slices';
import { ImageBaseUrl } from '../../../assets/Utils/BaseUrl';

const profileMenus = [
  {
    id: 1,
    iconName: (
      <Fontisto
        name={'player-settings'}
        size={responsiveFontSize(2.5)}
        color={Color('gold')}
      />
    ),
    title: 'Settings',
    mrgnTop: 0,
    bottomWidth: 1,
    borderTopRadius: 10,
    navTo: 'Security',
  },
  {
    id: 2,
    iconName: (
      <FontAwesome
        name={'user-circle-o'}
        size={responsiveFontSize(2.5)}
        color={Color('gold')}
      />
    ),
    title: 'Account Details',
    mrgnTop: 0,
    bottomWidth: 0,
    borderBottomRadius: 10,
    navTo: 'AccountDetail',
  },
  {
    id: 3,
    iconName: (
      <FontAwesome5
        name={'wallet'}
        size={responsiveFontSize(2.5)}
        color={Color('gold')}
      />
    ),
    title: 'Payment Method',
    mrgnTop: 2,
    bottomWidth: 1,
    borderTopRadius: 10,
  },
  {
    id: 4,
    iconName: (
      <Ionicons
        name={'shield-checkmark-outline'}
        size={responsiveFontSize(2.5)}
        color={Color('gold')}
      />
    ),
    title: 'Privacy and safety',
    mrgnTop: 0,
    bottomWidth: 1,
    navTo: 'PrivacyPolicy',
  },
  {
    id: 5,
    iconName: (
      <MaterialCommunityIcons
        name={'hand-front-left-outline'}
        size={responsiveFontSize(2.5)}
        color={Color('gold')}
      />
    ),
    title: 'Accessibility, display and languages',
    mrgnTop: 0,
    bottomWidth: 1,
    navTo: 'Language',
  },
  {
    id: 6,
    iconName: (
      <Fontisto
        name={'bell'}
        size={responsiveFontSize(2.5)}
        color={Color('gold')}
      />
    ),
    title: 'Notifications',
    mrgnTop: 0,
    bottomWidth: 0,
    borderBottomRadius: 10,
    rightIcon: true,
    navTo: 'Notification',
  },
  {
    id: 7,
    iconName: (
      <AntDesign
        name={'message1'}
        size={responsiveFontSize(2.5)}
        color={Color('gold')}
      />
    ),
    title: 'Help and Services',
    mrgnTop: 2,
    bottomWidth: 1,
    borderTopRadius: 10,
    navTo: 'HelpAndService',
  },
  {
    id: 8,
    iconName: (
      <Feather
        name={'alert-circle'}
        size={responsiveFontSize(2.5)}
        color={Color('gold')}
      />
    ),
    title: 'About',
    mrgnTop: 0,
    bottomWidth: 1,
    navTo: 'About',
  },
  {
    id: 9,
    iconName: (
      <AntDesign
        name={'logout'}
        size={responsiveFontSize(2.5)}
        color={Color('gold')}
      />
    ),
    title: 'Logout',
    mrgnTop: 0,
    bottomWidth: 0,
    borderBottomRadius: 10,
    navTo: 'Auth',
  },
];

const Profile = () => {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const dispatch = useDispatch();
  const toggleSwitch = () => setIsEnabled(previous => !previous);
  const { userData } = useSelector(state => state?.user);
  console.log('userdata', `${ImageBaseUrl}${userData?.image}`);

  return (
    <Background contentContainerStyle={{ paddingBottom: responsiveHeight(2) }}>
      <AppHeader onPress={() => navigation.goBack()} title="Profile" />

      <View>
        <View style={{ alignItems: 'center', gap: 20 }}>
          <View
            style={{
              borderWidth: 2,
              borderColor: Color('gold'),
              width: 110,
              height: 110,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              // source={APPImages.nailsTwo}
              source={
                userData?.image
                  ? { uri: `${ImageBaseUrl}${userData?.image}` }
                  : APPImages.userDummy
              }
              style={{ width: 100, height: 100, borderRadius: 100 }}
            />
          </View>
          <AppText
            title={userData?.username}
            textColor={AppColors.WHITE}
            textSize={2.5}
            textFontWeight
          />
          <View>
            <StyleButton
              onPress={() => navigation.navigate('EditProfile')}
              btnWidth={responsiveWidth(30)}
              btnHeight={responsiveHeight(4)}
              justifyContent={'center'}
              alignItems={'center'}
              fontSize={1.8}
              background={APPImages.edit_profile}
              color={AppColors.BLACK}
            >
              Edit Profile
            </StyleButton>
          </View>
        </View>

        <LineBreak space={3} />

        <FlatList
          data={profileMenus}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                activeOpacity={0.6}
                style={{
                  backgroundColor: Color('cardColor'),
                  marginTop: responsiveHeight(item.mrgnTop),
                  paddingHorizontal: responsiveWidth(4),
                  borderTopLeftRadius: item.borderTopRadius
                    ? item.borderTopRadius
                    : 0,
                  borderBottomLeftRadius: item.borderBottomRadius
                    ? item.borderBottomRadius
                    : 0,
                  borderTopRightRadius: item.borderTopRadius
                    ? item.borderTopRadius
                    : 0,
                  borderBottomRightRadius: item.borderBottomRadius
                    ? item.borderBottomRadius
                    : 0,
                }}
                onPress={() => {
                  if (item.id === 9) {
                    dispatch(clearToken());
                  } else if (item.navTo) {
                    navigation.navigate(item.navTo);
                  } else {
                    console.log('not working');
                  }
                }}
              >
                <View
                  style={{
                    borderBottomColor: Color('gold'),
                    borderBottomWidth:
                      item.bottomWidth === 1 ? item.bottomWidth : 0,
                    paddingVertical: responsiveHeight(2),
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'center',
                  }}
                >
                  {item.iconName}
                  <AppText
                    title={item?.title}
                    textColor={AppColors.WHITE}
                    textSize={2}
                  />
                  {item.rightIcon && (
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                      <Switch
                        trackColor={{
                          false: Color('otpInputBackground'),
                          true: Color('otpInputBackground'),
                        }}
                        thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                      />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </Background>
  );
};

export default Profile;
