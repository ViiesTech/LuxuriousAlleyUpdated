/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { responsiveFontSize, responsiveWidth } from '../utils/Responsive_Dimensions'
import { Color } from '../utils/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppColors from '../utils/AppColors';
import AppText from './AppTextComps/AppText';

const Counter = () => {
    const [count, setCount] = useState(0);

    return (
        <View
            style={{
                flexDirection: 'row',
                gap: responsiveWidth(4),
                alignItems: 'center',
            }}
        >
            <TouchableOpacity
                style={styles.btnContainer}
                onPress={() => setCount(count - 1)}
            >
                <AntDesign
                    name={'minus'}
                    size={responsiveFontSize(2)}
                    color={Color('gold')}
                />
            </TouchableOpacity>
            <AppText title={count} textSize={2.2} textColor={AppColors.WHITE} />
            <TouchableOpacity
                style={styles.btnContainer}
                onPress={() => setCount(count + 1)}
            >
                <AntDesign
                    name={'plus'}
                    size={responsiveFontSize(2)}
                    color={Color('gold')}
                />
            </TouchableOpacity>
        </View>
    );
};

export default Counter;

const styles = StyleSheet.create({
    btnContainer: {
        borderWidth: 1,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: Color('gold'),
        backgroundColor: Color('lightTheme'),
    },
});