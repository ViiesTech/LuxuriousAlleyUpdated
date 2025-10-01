/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import Background from '../../utils/Background';
import APPImages from '../../assets/APPImages';
import {
  responsiveFontSize,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import LineBreak from '../../components/LineBreak';
import AppText from '../../components/AppTextComps/AppText';
import AppTextInput from '../../components/AppTextInput';
import AppColors from '../../utils/AppColors';
import StyleButton from '../../components/StyleButton';
import { useNavigation } from '@react-navigation/native';
import SocialAuthButton from '../../components/SocialAuthButton';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SigninWithEmailAndPassword = () => {
  const navigation = useNavigation();

  return (
    <Background>
      <LineBreak space={10} />
      <Image
        source={APPImages.app_logo}
        style={{ width: responsiveWidth(100), alignSelf: 'center' }}
        resizeMode="contain"
      />
      <LineBreak space={5} />
      <View>
        <AppText
          title="Welcome to"
          textColor={AppColors.WHITE}
          textSize={4}
          textFontWeight={700}
        />
        <AppText
          title="Luxurious Alley"
          textColor={AppColors.WHITE}
          textSize={4.5}
          textFontWeight={700}
        />
      </View>

      <LineBreak space={2} />

      <AppTextInput
        inputPlaceHolder={'Enter your email or phone number'}
        containerBg={AppColors.INPUTBG}
        placeholderTextColor={AppColors.BLACK}
      />

      <LineBreak space={2} />

      <AppTextInput
        inputPlaceHolder={'Enter your password'}
        containerBg={AppColors.INPUTBG}
        placeholderTextColor={AppColors.BLACK}
      />

      <LineBreak space={2} />

      <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
        <AppText
          title="Forget password"
          textSize={1.7}
          textAlignment={'right'}
          textColor={AppColors.WHITE}
        />
      </TouchableOpacity>

      <LineBreak space={2} />

      <View>
        <StyleButton
          onPress={() => navigation.navigate('Main', { screen: 'SetLocation' })}
        >
          Login
        </StyleButton>
      </View>

      <LineBreak space={2} />

      <AppText
        title="Or"
        textAlignment={'center'}
        textSize={2}
        textColor={AppColors.WHITE}
      />
      <LineBreak space={2} />

      <View
        style={{
          justifyContent: 'flex-end',
          gap: 10,
        }}
      >
        <SocialAuthButton
          bgColor={AppColors.BLACK}
          title={'Continue with Apple'}
          logo={
            <AntDesign
              name={'apple1'}
              size={responsiveFontSize(2)}
              color={AppColors.WHITE}
            />
          }
        />
        <SocialAuthButton
          txtColor={AppColors.BLACK}
          bgColor={AppColors.LIGHTGRAY}
          title={'Continue with Google'}
          logo={
            <AntDesign
              name={'google'}
              size={responsiveFontSize(2)}
              color={AppColors.BLACK}
            />
          }
        />
      </View>
    </Background>
  );
};

export default SigninWithEmailAndPassword;
