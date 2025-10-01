/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, ImageBackground, Dimensions } from 'react-native'
import { responsiveFontSize, responsiveWidth } from '../utils/Responsive_Dimensions'
import AppColors from '../utils/AppColors'

interface Props {
    children: any,
    style?: object,
    fontSize?: number,
    onPress: any,
    icon?: any,
    loading?: boolean,
    resizeMode?: any,
    background?: any,
    btnWidth?: any,
    btnHeight?: any,
    justifyContent?: any,
    alignItems?: any,
    color?: any,
    leftIcon?: any,
    rightIcon?: any,
    fontWeight?: any,
}

const Loading = ({ color }: { color?: any }) => {
    return <ActivityIndicator color={color || AppColors.textColor} />
}

const { width, height } = Dimensions.get('window');

const StyleButton = ({ loading, children, color, fontWeight, style, leftIcon, rightIcon, fontSize, onPress, justifyContent, alignItems, resizeMode, background, btnWidth, btnHeight }: Props) => {
    const bg = background || require('../assets/button-bg.png');

    return (
        <TouchableOpacity disabled={loading} onPress={() => onPress()} style={[styles.btn, style]}>
            <ImageBackground resizeMode={resizeMode || 'stretch'} source={bg} style={{ width: btnWidth, height: btnHeight, justifyContent: justifyContent, alignItems: alignItems || 'center', }} >
                {
                    loading
                        ?
                        <Loading />
                        :
                        <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                            {leftIcon}
                            <Text style={{
                                fontSize: responsiveFontSize(fontSize || 2.2),
                                color: color ? color : AppColors.textColor,
                                fontFamily: 'Poppins-ExtraBold',
                                fontWeight: fontWeight ? fontWeight : 'bold',
                                paddingVertical: btnHeight || btnWidth ? null : height * 0.015
                            }}>{children}</Text>
                            {rightIcon}
                        </View>
                }
            </ImageBackground>
        </TouchableOpacity>
    )
}

export default StyleButton;


const styles = StyleSheet.create({
    btn: {
        borderRadius: 1000,
    }
})