import React from 'react';
import { View } from 'react-native';
import Background from '../../utils/Background';
import AppText from '../../components/AppTextComps/AppText';
import AppColors from '../../utils/AppColors';
import LineBreak from '../../components/LineBreak';
import AppTextInput from '../../components/AppTextInput';
import { useNavigation } from '@react-navigation/native';
import StyleButton from '../../components/StyleButton';

const ForgetPassword = () => {
  const navigation = useNavigation();

  return (
    <Background>
      <LineBreak space={2} />
      <AppText
        title="Forget Password"
        textSize={2.5}
        textFontWeight
        textAlignment={'center'}
        textColor={AppColors.WHITE}
      />
      <LineBreak space={1} />
      <AppText
        title="Please type your email below and we will give you a OTP code"
        textSize={1.7}
        textAlignment={'center'}
        textwidth={68}
        textColor={AppColors.DARKGRAY}
      />
      <LineBreak space={2} />

      <AppTextInput
        inputPlaceHolder={'Enter your email or phone number'}
        containerBg={AppColors.INPUTBG}
        placeholderTextColor={AppColors.BLACK}
      />

      <LineBreak space={62} />

      <View>
        <StyleButton onPress={() => navigation.navigate('Otp', {type: 'forgotPassword'})}>
          Send Code
        </StyleButton>
      </View>
    </Background>
  );
};

export default ForgetPassword;
