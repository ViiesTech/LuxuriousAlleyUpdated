/* eslint-disable react-native/no-inline-styles */
import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils/Responsive_Dimensions'
import AppColors from '../utils/AppColors'
type props = {
  logo?: any,
  inputPlaceHolder?: any,
  inputBgColour?: any,
  inputWidth?: number,
  containerBg?: any
  borderWidth?: any
  borderColor?: any
  paddingHorizontal?: any;
  borderRadius?: any
  placeholderTextColor?: any;
  inputHeight?: any;
  multiline?: any;
  textAlignVertical?: any;
  onChangeText?: () => void;
  keyboardType?: string,

}
const AppTextInput = ({ logo, inputBgColour, textAlignVertical, inputHeight, multiline, placeholderTextColor, inputPlaceHolder, borderWidth, borderColor, inputWidth = 80, containerBg, paddingHorizontal, borderRadius, onChangeText, keyboardType }: props) => {
  return (
    <View style={{
      flexDirection: 'row',
      borderWidth: borderWidth, borderColor: borderColor, backgroundColor: containerBg, paddingHorizontal: paddingHorizontal ? paddingHorizontal : 20, paddingVertical: 5, borderRadius: borderRadius ? borderRadius : 10, alignItems: 'center', gap: 10
    }}>
      {
        logo
      }

      <TextInput
        keyboardType={keyboardType || 'default'}
        onChangeText={onChangeText}
        placeholder={inputPlaceHolder}
        multiline={multiline}
        placeholderTextColor={placeholderTextColor ? placeholderTextColor : AppColors.WHITE}
        style={{ width: responsiveWidth(inputWidth), textAlignVertical: textAlignVertical, height: responsiveHeight(inputHeight), color: placeholderTextColor ? placeholderTextColor : AppColors.WHITE }}

      />
    </View>
  )
}

export default AppTextInput