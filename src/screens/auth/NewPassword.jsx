import React, { useState } from 'react';
import Background from '../../utils/Background';
import LineBreak from '../../components/LineBreak';
import AppText from '../../components/AppTextComps/AppText';
import AppColors from '../../utils/AppColors';
import AppTextInput from '../../components/AppTextInput';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';
import StyleButton from '../../components/StyleButton';
import { resetPassword, ShowToast } from '../../GlobalFunctions';

const NewPassword = ({ route }) => {
  const navigation = useNavigation();
  const { email } = route?.params;
  const [isLoading, setIsLoading] = useState(false);
  const [pass, setPass] = useState();
  const [confirmPass, setConfirmPass] = useState();
  const resetPassHandler = async () => {
    if (!pass) {
      return ShowToast('error', 'Passwords Is Required');
    } else if (!confirmPass) {
      return ShowToast('error', 'Re Enter Your Password');
    } else if (pass !== confirmPass) {
      return ShowToast('error', 'Passwords Must be Same');
    } else {
      setIsLoading(true);
      try {
        await resetPassword(email, pass,navigation);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }
  };
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
        onChangeText={val => setPass(val)}
        inputPlaceHolder={'New Password'}
        containerBg={AppColors.INPUTBG}
        placeholderTextColor={AppColors.BLACK}
      />
      <LineBreak space={2} />

      <AppTextInput
        onChangeText={val => setConfirmPass(val)}
        inputPlaceHolder={'Confirm New Password'}
        containerBg={AppColors.INPUTBG}
        placeholderTextColor={AppColors.BLACK}
      />

      <LineBreak space={55} />

      <View>
        <StyleButton onPress={resetPassHandler}>
          {isLoading ? (
            <ActivityIndicator size={'large'} color={AppColors.BLACK} />
          ) : (
            'Confirm New Password'
          )}
        </StyleButton>
      </View>
    </Background>
  );
};

export default NewPassword;
