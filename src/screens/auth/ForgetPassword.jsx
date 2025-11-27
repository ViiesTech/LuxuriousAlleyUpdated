import React, { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import Background from '../../utils/Background';
import AppText from '../../components/AppTextComps/AppText';
import AppColors from '../../utils/AppColors';
import LineBreak from '../../components/LineBreak';
import AppTextInput from '../../components/AppTextInput';
import { useNavigation } from '@react-navigation/native';
import StyleButton from '../../components/StyleButton';
import { forgotPasswordUser, ShowToast } from '../../GlobalFunctions';

const ForgetPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const forgotPassword = async () => {
    if (!email) {
      return ShowToast('error', 'Email is Required');
    }
    setIsLoading(true);
    try {
      await forgotPasswordUser(email, navigation);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

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
        keyboardType="email-address"
        onChangeText={val => setEmail(val)}
        inputPlaceHolder={'Enter your email or phone number'}
        containerBg={AppColors.INPUTBG}
        placeholderTextColor={AppColors.BLACK}
      />

      <LineBreak space={62} />

      <View>
        <StyleButton onPress={forgotPassword}>
          {isLoading ? (
            <ActivityIndicator size={'large'} color={AppColors.BLACK} />
          ) : (
            'Send Code'
          )}
        </StyleButton>
      </View>
    </Background>
  );
};

export default ForgetPassword;
