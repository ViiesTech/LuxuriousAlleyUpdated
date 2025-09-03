import React from 'react';
import Background from '../../utils/Background';
import LineBreak from '../../components/LineBreak';
import AppText from '../../components/AppTextComps/AppText';
import AppColors from '../../utils/AppColors';
import AppTextInput from '../../components/AppTextInput';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import StyleButton from '../../components/StyleButton';

const NewPassword = () => {
  const navigation = useNavigation();
  return (
    <Background>
      <LineBreak space={2} />
      <AppText
        title="Enter Your Passsword"
        textSize={2.5}
        textFontWeight
        textAlignment={'center'}
        textColor={AppColors.WHITE}
      />
      <LineBreak space={1} />
      <AppText
        title="Now you can create new password and confirm a below"
        textSize={1.7}
        textAlignment={'center'}
        textwidth={68}
        textColor={AppColors.DARKGRAY}
      />
      <LineBreak space={2} />

      <AppTextInput
        inputPlaceHolder={'New Password'}
        containerBg={AppColors.INPUTBG}
        placeholderTextColor={AppColors.BLACK}
      />
      <LineBreak space={2} />

      <AppTextInput
        inputPlaceHolder={'Confirm New Password'}
        containerBg={AppColors.INPUTBG}
        placeholderTextColor={AppColors.BLACK}
      />

      <LineBreak space={55} />

      <View>
        <StyleButton onPress={() => navigation.navigate('SignIn')}>
          Confirm New Password
        </StyleButton>
      </View>
    </Background>
  );
};

export default NewPassword;
