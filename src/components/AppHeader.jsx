/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import AppText from './AppTextComps/AppText';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive_Dimensions';
import AppColors from '../utils/AppColors';
import { Color } from '../utils/Colors';

const AppHeader = ({
  onPress,
  isFvrt = false,
  showFvrtIcon = true,
  title,
  isTextAlignCentered,
  isHideFav,
  onFvrtsPress,
  isHeartLoading = false,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: Color('otpInputBackground'),
        gap: title ? 10 : 0,
        paddingTop: title ? responsiveHeight(3) : 10,
        paddingBottom: title ? responsiveHeight(3) : 10,
        justifyContent:
          title && !isTextAlignCentered ? 'flex-start' : 'space-between',
        alignItems: 'center',
        paddingVertical: responsiveHeight(2),
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        style={{
          borderWidth: 1,
          width: responsiveHeight(6),
          height: responsiveHeight(6),
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: responsiveWidth(4),
          borderColor: Color('gold'),
        }}
      >
        <MaterialIcons
          name={'arrow-back-ios'}
          size={responsiveFontSize(2.7)}
          color={Color('gold')}
        />
      </TouchableOpacity>
      <AppText
        title={title}
        textSize={2.4}
        textFontWeight
        textColor={AppColors.WHITE}
      />
      {title || isHideFav ? (
        <View />
      ) : showFvrtIcon ? (
        <TouchableOpacity
          onPress={onFvrtsPress}
          style={{
            borderWidth: 1,
            padding: responsiveHeight(1.5),
            borderRadius: 10,
            borderColor: Color('gold'),
          }}
        >
          {isHeartLoading ? (
            <ActivityIndicator size={'small'} color={AppColors.themeColor} />
          ) : (
            <AntDesign
              name={isFvrt ? 'heart' : 'hearto'}
              size={responsiveFontSize(2.7)}
              color={Color('gold')}
            />
          )}
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default AppHeader;
