import React, { useState } from 'react';
import { Dimensions, ImageBackground, TouchableOpacity, View } from 'react-native';
import { Color } from '../../lux/src/utils/Colors';
import { Small } from './Text';

const { height } = Dimensions.get('window');

const Tab = ({style, tab1, tab2, activeFirstTab, setTab}) => {
    const [ isFirstActive, setFirstActive ] = useState(activeFirstTab);
    const activeStyle = { backgroundColor: Color('tabActiveColor') }
    const activeTextStyle = { color: Color('btnText') }

    return (
        <View style={[{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: Color('otpInputBackground'), borderRadius: 30, borderColor: Color('gold'), borderWidth: 1, padding: 5}, style]}>
            <TouchableOpacity onPress={() => {
                setFirstActive(true);
                setTab(true);
            }} style={[{borderRadius: 30, flex: 1, alignItems: 'center', paddingVertical: height * 0.01}, isFirstActive ? activeStyle: {}]}>
                <Small style={isFirstActive ? activeTextStyle : {}}>{tab1}</Small>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                setFirstActive(false);
                setTab(false);
            }} style={[{borderRadius: 30, flex: 1, alignItems: 'center', paddingVertical: height * 0.01}, !isFirstActive ? activeStyle: {}]}>
                <Small style={!isFirstActive ? activeTextStyle : {}}>{tab2}</Small>
            </TouchableOpacity>
        </View>
    )
}

export const TabWithoutBorders = ({style, tab1, tab2, activeFirstTab, setTab}) => {
    const [ isFirstActive, setFirstActive ] = useState(activeFirstTab);
    const activeTextStyle = { color: Color('btnText'), fontFamily: 'Lora-Regular' }

    return (
        <View style={[{height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}, style]}>
            <TouchableOpacity onPress={() => {
                setFirstActive(true);
                setTab(true);
            }} style={{flex: 1}}>
            <ImageBackground style={{flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: height * 0.01}} source={isFirstActive ? require('../../assets/tab-background.png') : ""} resizeMode='stretch'>
                <Small style={isFirstActive ? activeTextStyle : {fontFamily: 'Lora-Regular'}}>{tab1}</Small>
            </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                setFirstActive(false);
                setTab(false);
            }} style={{flex: 1}}>
                <ImageBackground style={{flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: height * 0.01}} source={!isFirstActive ? require('../../assets/tab-background.png') : ""} resizeMode='stretch'>
                    <Small style={!isFirstActive ? activeTextStyle : {fontFamily: 'Lora-Regular'}}>{tab2}</Small>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    )
}

export default Tab;