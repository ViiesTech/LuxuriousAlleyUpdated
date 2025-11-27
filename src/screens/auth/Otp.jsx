/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import AppText from '../../components/AppTextComps/AppText';
import AppColors from '../../utils/AppColors';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
} from 'react-native-confirmation-code-field';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import StyleButton from '../../components/StyleButton';
import { useNavigation } from '@react-navigation/native';
import Background from '../../utils/Background';
import LineBreak from '../../components/LineBreak';
import { Color } from '../../utils/Colors';
import {
  forgotPasswordUser,
  RegisterUser,
  ShowToast,
  verifyForgotPassOtp,
  verifyOtp,
} from '../../GlobalFunctions';
import { useDispatch } from 'react-redux';

const Otp = ({ navigation, route }) => {
  const [value, setValue] = useState();
  const ref = useBlurOnFulfill({ value, cellCount: 4 });
  const { registerUser, email, userName, password, token } = route?.params;
  const [isLoading, setIsLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const dispatch = useDispatch();
  console.log('register,', registerUser, 'otp', value, 'token', token, value);
  const verifyOtpHandler = async () => {
    if (!value || value.length !== 4) {
      return ShowToast('error', 'Please enter a valid 4-digit OTP');
    }
    setIsLoading(true);
    try {
      registerUser
        ? await verifyOtp(token, value, navigation, dispatch)
        : await verifyForgotPassOtp(email, value, navigation);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  const resendOtpForRegister = async () => {
    setResendLoading(true);
    try {
      await RegisterUser(userName, email, password, navigation);
      setResendLoading(false);
    } catch (error) {
      setResendLoading(false);
    }
  };

  const resendOtpForForgotPass = async () => {
    setResendLoading(true);
    try {
      await forgotPasswordUser(email, navigation);
      setResendLoading(false);
    } catch (error) {
      setResendLoading(false);
    }
  };
  return (
    <Background>
      <LineBreak space={4} />
      <View style={{ flex: 1 }}>
        <View style={{ gap: 10 }}>
          <AppText
            title={registerUser ? 'Verify Your Identity' : 'Email Verification'}
            textSize={3}
            textColor={AppColors.WHITE}
            textAlignment={'center'}
            textFontWeight
          />
          <AppText
            title={
              registerUser
                ? `We’ve sent a 4-digit code to ${email} Please enter it below.`
                : 'Please type OTP code that we give you'
            }
            textSize={1.9}
            textwidth={80}
            textAlignment={'center'}
            textColor={'#939393'}
          />
        </View>

        <CodeField
          ref={ref}
          value={value}
          onChangeText={setValue}
          cellCount={4}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          autoComplete={Platform.select({
            android: 'sms-otp',
            default: 'one-time-code',
          })}
          testID="my-code-input"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
        {resendLoading ? (
          <View style={{ top: responsiveHeight(5) }}>
            <ActivityIndicator size={'large'} color={Color('gold')} />
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              marginTop: 20,
            }}
          >
            <AppText
              title="Didn’t receive a code?"
              textSize={1.9}
              textAlignment={'center'}
              textColor={'#939393'}
            />
            <TouchableOpacity
              onPress={
                registerUser ? resendOtpForRegister : resendOtpForForgotPass
              }
            >
              <AppText
                title="Resend"
                textSize={1.9}
                textAlignment={'center'}
                textColor={Color('gold')}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <LineBreak space={50} />
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <StyleButton
          // onPress={() => {
          //   if (registerUser) {
          //     navigation.navigate('Main', { screen: 'SetLocation' });
          //   } else {
          //     navigation.navigate('NewPassword');
          //   }
          // }}
          onPress={verifyOtpHandler}
        >
          {isLoading ? (
            <ActivityIndicator size={'large'} color={AppColors.BLACK} />
          ) : registerUser ? (
            'Continue'
          ) : (
            'Verify Email'
          )}
        </StyleButton>
      </View>
    </Background>
  );
};

export default Otp;

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginTop: 20,
    width: responsiveWidth(70),
    alignSelf: 'center',
  },
  cell: {
    width: responsiveWidth(15),
    height: responsiveHeight(7),
    fontSize: responsiveFontSize(3),
    backgroundColor: Color('lightTheme'),
    borderRadius: 10,
    textAlign: 'center',
    color: AppColors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  focusCell: {
    borderColor: Color('gold'),
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: Color('otpInputBackground'),
    color: AppColors.WHITE,
    justifyContent: 'center',
  },
});
