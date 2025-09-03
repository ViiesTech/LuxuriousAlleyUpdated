/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import Background from '../../utils/Background';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { H3, Pera, Small } from '../../components/Text';
import Br from '../../components/Br';
import Input from '../../components/Input';
import { Color } from '../../utils/Colors';
import Button from '../../components/StyleButton';
import AppText from '../../components/AppTextComps/AppText';
import AppColors from '../../utils/AppColors';
import LineBreak from '../../components/LineBreak';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import Feather from 'react-native-vector-icons/Feather';
import SocialAuthButton from '../../components/SocialAuthButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';

const { width, height } = Dimensions.get('window');
const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [screenType, setScreenType] = useState('signup_with_email');
  return (
    <Background>
      <View style={{ marginVertical: responsiveHeight(2) }}>
        <LineBreak space={2} />
        <AppText
          title={'Sign Up'}
          textColor={AppColors.WHITE}
          textSize={3}
          textFontWeight
          textAlignment={'center'}
        />
        <LineBreak space={4} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: responsiveWidth(4),
            justifyContent: 'space-between',
          }}
        >
          <TouchableOpacity onPress={() => setScreenType('signup_with_email')}>
            <AppText
              title={'Signup with email'}
              textColor={
                screenType === 'signup_with_email'
                  ? Color('gold')
                  : AppColors.WHITE
              }
              textSize={2}
              textAlignment={'center'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setScreenType('signup_with_phone')}>
            <AppText
              title={'Signup with phone'}
              textColor={
                screenType === 'signup_with_phone'
                  ? Color('gold')
                  : AppColors.WHITE
              }
              textSize={2}
              textAlignment={'center'}
            />
          </TouchableOpacity>
        </View>

        <LineBreak space={3} />

        <View>
          <Input
            value={email}
            color={Color('inputColor')}
            icon={<Feather name="user" size={25} color={Color('gold')} />}
            placeholder="input field"
            placeholderColor={Color('inputPlaceholder')}
            style={{ marginBottom: height * 0.02 }}
            onChange={emailAddress => setEmail(emailAddress)}
          />
          <Input
            value={password}
            color={Color('inputColor')}
            icon={<Fontisto name="email" size={25} color={Color('gold')} />}
            placeholder={'input field'}
            placeholderColor={Color('inputPlaceholder')}
            style={{ marginBottom: height * 0.02 }}
            onChange={userPassword => setPassword(userPassword)}
          />
          {screenType === 'signup_with_email' && (
            <Input
              value={password}
              color={Color('inputColor')}
              icon={<Fontisto name="key" size={25} color={Color('gold')} />}
              placeholder="input field"
              placeholderColor={Color('inputPlaceholder')}
              style={{ marginBottom: height * 0.02 }}
              onChange={userPassword => setPassword(userPassword)}
            />
          )}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <AppText
                title="SignIn with phone"
                textSize={1.7}
                textColor={AppColors.WHITE}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('SigninWithEmailAndPassword')}>
              <AppText
                title="SignIn with email & password"
                textSize={1.7}
                textColor={AppColors.WHITE}
              />
            </TouchableOpacity>
          </View>

          <LineBreak space={screenType === 'signup_with_email' ? 2 : 11} />
          <Button
            style={{ width: width * 0.9, alignSelf: 'center' }}
            onPress={() => navigation.navigate('Login')}
          >
            Continue
          </Button>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 15,
          paddingHorizontal: responsiveWidth(8),
        }}
      >
        <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
          <Fontisto
            name={isChecked ? 'checkbox-active' : 'checkbox-passive'}
            size={25}
            color={Color('textColor')}
          />
        </TouchableOpacity>
        <Small style={{ lineHeight: 25 }}>
          I agree to Fraime{' '}
          <Small style={{ color: Color('gold_100') }}>Terms of Service</Small>{' '}
          <Small>and</Small>{' '}
          <Small style={{ color: Color('gold_100') }}>Privacy Policy</Small>
        </Small>
      </View>
      <LineBreak space={11} />

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

export default SignIn;
