/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { Image, ImageBackground } from 'react-native';
import { Color } from '../../utils/Colors';
import APPImages from '../../assets/APPImages';
import { responsiveWidth } from '../../utils/Responsive_Dimensions';
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();

    useEffect(() => {
      setTimeout(() => {
        navigation.replace('SigninWithEmailAndPassword')
      }, 2000);
    }, [navigation])

  return (
    <ImageBackground
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color('otpInputBackground'),
      }}
      source={APPImages.bg}
    >
      <Image
        source={APPImages.app_logo}
        style={{ width: responsiveWidth(100) }}
        resizeMode="contain"
      />
    </ImageBackground>
  );
};

export default Splash;
