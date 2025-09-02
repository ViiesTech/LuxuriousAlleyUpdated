import React from 'react';
import { Text } from 'react-native';
import { Color } from '../utils/Colors';
import { responsiveFontSize } from '../utils/Responsive_Dimensions';

interface Props {
    children: any,
    style?: object,
    numberOfLines?: number
}


export const H1 = ({children, style, numberOfLines}: Props) => {
    return (
        <Text numberOfLines={numberOfLines} style={[{ color: Color('textColor'), fontSize: responsiveFontSize(2.5), fontFamily: 'Lora-Regular' }, style]}>{children}</Text>
    )
}

export const H2 = ({children, style, numberOfLines}: Props) => {
    return (
        <Text numberOfLines={numberOfLines} style={[{ color: Color('textColor'), fontSize: responsiveFontSize(2.4), fontFamily: 'Lora-Regular' }, style]}>{children}</Text>
    )
}

export const H3 = ({children, style, numberOfLines}: Props) => {
    return (
        <Text numberOfLines={numberOfLines} style={[{ color: Color('textColor'), fontSize: responsiveFontSize(2.4), fontFamily: 'Lora-Regular' }, style]}>{children}</Text>
    )
}

export const H4 = ({children, style, numberOfLines}: Props) => {
    return (
        <Text numberOfLines={numberOfLines} style={[{ color: Color('textColor'), fontSize: responsiveFontSize(2.4), fontFamily: 'Lora-Regular' }, style]}>{children}</Text>
    )
}

export const H5 = ({children, style, numberOfLines}: Props) => {
    return (
        <Text numberOfLines={numberOfLines} style={[{ color: Color('textColor'), fontSize: responsiveFontSize(2.4), fontFamily: 'Lora-Regular' }, style]}>{children}</Text>
    )
}

export const H6 = ({children, style, numberOfLines}: Props) => {
    return (
        <Text numberOfLines={numberOfLines} style={[{ color: Color('textColor'), fontSize: responsiveFontSize(2.4), fontFamily: 'Lora-Regular' }, style]}>{children}</Text>
    )
}

// PARAGRAPH
export const Pera = ({children, style, numberOfLines}: Props) => {
    return (
        <Text numberOfLines={numberOfLines} style={[{ color: Color('textColor'), fontSize: responsiveFontSize(2.4), fontFamily: "Poppins-Regular" }, style]}>{children}</Text>
    )
}

export const Small = ({children, style, numberOfLines}: Props) => {
    return (
        <Text numberOfLines={numberOfLines} style={[{ color: Color('textColor'), fontSize: responsiveFontSize(2), fontFamily: "Poppins-Regular" }, style]}>{children}</Text>
    )
}

export const XSmall = ({children, style, numberOfLines}: Props) => {
    return (
        <Text numberOfLines={numberOfLines} style={[{ color: Color('textColor'), fontSize: responsiveFontSize(2.4), fontFamily: "Poppins-Regular" }, style]}>{children}</Text>
    )
}

export const XXSmall = ({children, style, numberOfLines}: Props) => {
    return (
        <Text numberOfLines={numberOfLines} style={[{ color: Color('textColor'), fontSize: responsiveFontSize(2.4), fontFamily: "Poppins-Regular" }, style]}>{children}</Text>
    )
}