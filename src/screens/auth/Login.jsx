import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import React from 'react';
import AppText from '../../components/AppTextComps/AppText';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import BackgroundScreen from '../../components/AppTextComps/BackgroundScreen';
import AppTextInput from '../../components/AppTextInput';
import AppColors from '../../utils/AppColors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AppButton from '../../components/AppButton';
import SocialAuthButton from '../../components/SocialAuthButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Logo from '../../components/AppTextComps/Logo';
import APPImages from '../../assets/APPImages';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import StyleButton from '../../components/StyleButton';

const { width, height } = Dimensions.get('window');

const Login = () => {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={[AppColors.WHITE, AppColors.BLACK]}
      style={{ flex: 1, padding: 20 }}
    >
      <View
        style={{
          height: responsiveHeight(10),
          justifyContent: 'flex-end',
          marginBottom: 20,
        }}
      >
        <Logo logoUrl={APPImages.LOGO} />
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          paddingVertical: responsiveHeight(8),
          gap: 20,
        }}
      >
        {/* <Logo logoUrl={APPImages.LOGO} logoWeight={responsiveHeight(20)} logoHeight={responsiveHeight(20)} logoReizeMode={'contain'}/> */}

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

        <AppTextInput
          inputPlaceHolder={'Enter your email or phone number'}
          containerBg={AppColors.INPUTBG}
          placeholderTextColor={AppColors.BLACK}
        />

        <View>
          <StyleButton onPress={() => navigation.navigate('Otp')}>
            Continue
          </StyleButton>
        </View>

        <AppText
          title="Or"
          textAlignment={'center'}
          textSize={2}
          textColor={AppColors.WHITE}
        />

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
      </View>
    </LinearGradient>
  );
};

export default Login;
