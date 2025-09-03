/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
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

const Otp = ({ route }) => {
  const [value, setValue] = useState();
  const ref = useBlurOnFulfill({ value, cellCount: 4 });
  const navigation = useNavigation();
  const type = route?.params?.type;

  return (
    <Background>
      <LineBreak space={4} />
      <View style={{ flex: 1 }}>
        <View style={{ gap: 10 }}>
          <AppText
            title={type ? 'Email Verification' : 'Verify Your Identity'}
            textSize={3}
            textColor={AppColors.WHITE}
            textAlignment={'center'}
            textFontWeight
          />
          <AppText
            title={
              type
                ? 'Please type OTP code that we give you'
                : 'We’ve sent a 4-digit code to 071*****05 Please enter it below.'
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
          <TouchableOpacity>
            <AppText
              title="Resend"
              textSize={1.9}
              textAlignment={'center'}
              textColor={Color('gold')}
            />
          </TouchableOpacity>
        </View>
      </View>
      <LineBreak space={50} />
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <StyleButton
          onPress={() => {
            if (type) {
              navigation.navigate('NewPassword');
            } else {
              navigation.navigate('Main');
            }
          }}
        >
          {type ? 'Verify Email' : 'Continue'}
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
