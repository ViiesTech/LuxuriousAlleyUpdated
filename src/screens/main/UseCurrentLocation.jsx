/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, ImageBackground, TouchableOpacity } from 'react-native';
import APPImages from '../../assets/APPImages';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import AppText from '../../components/AppTextComps/AppText';
import AppColors from '../../utils/AppColors';
import { useNavigation } from '@react-navigation/native';
import LineBreak from '../../components/LineBreak';
import AppTextInput from '../../components/AppTextInput';
import StyleButton from '../../components/StyleButton';
import Feather from 'react-native-vector-icons/Feather';
import SVGXml from '../../components/SVGXML';
import { AppIcons } from '../../assets/Icons';

const UseCurrentLocation = () => {
  const nav = useNavigation();

  return (
    <ImageBackground source={APPImages.map_full} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, paddingHorizontal: responsiveWidth(4) }}>
        <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => nav.goBack()}>
            <MaterialIcons
              name={'arrow-back-ios'}
              size={responsiveFontSize(2.7)}
              color={AppColors.BLACK}
            />
          </TouchableOpacity>
          <AppText
            title={'Your Location'}
            textSize={2.4}
            textFontWeight
            textColor={AppColors.BLACK}
          />
        </View>
        <LineBreak space={2} />
        <AppTextInput
          inputPlaceHolder={'Type Location you want'}
          containerBg={AppColors.WHITE}
          placeholderTextColor={AppColors.DARKGRAY}
          borderRadius={12}
        />
        <View
          style={{
            position: 'absolute',
            alignItems: 'center',
            alignSelf: 'center',
            top: responsiveHeight(40),
          }}
        >
          <StyleButton
            onPress={() => nav.navigate('UseCurrentLocation')}
            color={AppColors.WHITE}
            btnWidth={150}
            btnHeight={30}
            justifyContent={'center'}
            fontSize={1.5}
            fontWeight={'simple'}
            rightIcon={
              <Feather
                name={'chevron-right'}
                color={AppColors.WHITE}
                size={responsiveFontSize(2)}
              />
            }
          >
            Set Location
          </StyleButton>
          <LineBreak space={1} />
          <SVGXml icon={AppIcons.marker_red} width={40} height={40} />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}
        >
          <TouchableOpacity>
            <ImageBackground
              source={APPImages.marker_bg}
              style={{ width: 60, height: 60, justifyContent: 'center', alignItems: 'center' }}
            >
              <MaterialIcons
                name={'gps-fixed'}
                size={responsiveFontSize(4)}
                color={AppColors.WHITE}
              />
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default UseCurrentLocation;
