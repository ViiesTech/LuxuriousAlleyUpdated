import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveWidth } from '../utils/Responsive_Dimensions'
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
borderRadius?:any
placeholderTextColor?:any
}
const AppTextInput = ({ logo, inputBgColour, placeholderTextColor, inputPlaceHolder, borderWidth, borderColor, inputWidth = 80, containerBg, paddingHorizontal, borderRadius }: props) => {
  return (
    <View style={{
      flexDirection: 'row',
      borderWidth: borderWidth, borderColor: borderColor, backgroundColor: containerBg, paddingHorizontal: paddingHorizontal ? paddingHorizontal : 20, paddingVertical: 5, borderRadius: borderRadius ? borderRadius : 10, alignItems: 'center', gap: 10
    }}>
      {
        logo
      }

      <TextInput
        placeholder={inputPlaceHolder}
        placeholderTextColor={placeholderTextColor ? placeholderTextColor : AppColors.WHITE}
        style={{ width: responsiveWidth(inputWidth), color: placeholderTextColor ? placeholderTextColor : AppColors.WHITE }}

      />
    </View>
  )
}

export default AppTextInput