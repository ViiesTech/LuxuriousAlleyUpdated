import React, { useState } from 'react';
import { Dimensions, ImageBackground, Platform, StyleSheet, TextInput, View } from 'react-native';
import { Small } from './Text';
import { Color } from '../utils/Colors';

const { width, height } = Dimensions.get('window');

interface Props {
    icon?: any,
    label?: boolean,
    labelText?: string,
    color?: string,
    placeholder?: string,
    placeholderColor?: string,
    style?: object,
    secure?: boolean,
    numberOfLines?: number,
    onChange?: any,
    value?: any,
    onBlur?: any,
    keyboardType?: string,
}

const Input = ({ onBlur, keyboardType, secure, icon, label, labelText, color, placeholder, placeholderColor, style, numberOfLines, onChange, value }: Props) => {
    const [toggleSecure, setToggleSecure] = useState(secure);
    return (
        <>
            {label && <Small style={{
                color: color,
                fontFamily: 'Manrope-font',
                marginBottom: height * 0.008,
                marginLeft: width * 0.03
            }}>{labelText}</Small>}
            <View style={[styles.input, style, { alignItems: icon ? 'center' : 'flex-start' }]}>
                <View style={{
                    display: 'flex',
                    alignItems: icon ? 'center' : 'flex-start',
                    flexDirection: 'row',
                    gap: 10,
                }}>
                    {icon}
                    <TextInput keyboardType={keyboardType || 'default'} onBlur={onBlur} value={value} onChangeText={(value) => onChange(value)} multiline={numberOfLines && numberOfLines > 0 ? true : false} numberOfLines={numberOfLines} secureTextEntry={toggleSecure} style={[styles.field, { color: color, textAlignVertical: numberOfLines && numberOfLines > 0 ? 'top' : 'center' }]} placeholder={placeholder} placeholderTextColor={placeholderColor} />
                </View>
            </View>
        </>
    )
}

export default Input;

const styles = StyleSheet.create({
    input: {
        paddingHorizontal: width * 0.04,
        borderRadius: 15,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: Color('gold')
    },
    field: {
        width: width * 0.6,
        minHeight: Platform.OS === 'ios' ? 60 : height * 0.065
    }
})