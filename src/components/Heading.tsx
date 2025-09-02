import React from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { Color } from '../utils/Colors';
import { H6, Pera } from './Text';
import { ArrowCircleRight } from 'iconsax-react-native';

const { height } = Dimensions.get('window');

const Heading = ({style, label, secondLabel}: {style?: any, label: 'string', secondLabel?: 'string'}) => {
    return (
        <View style={[{flexDirection: 'row', justifyContent: 'space-between'}, style]}>
            <H6 style={{fontFamily: 'Lora-Regular', color: Color('gold_dark')}}>{label}</H6>
            {secondLabel && (
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                    <Pera style={{fontFamily: 'Lora-Regular', color: Color('gold_dark')}}>{secondLabel}</Pera>
                    <ArrowCircleRight size="20" color={Color('gold_dark')} />
                </TouchableOpacity>
            )}
        </View>
    )
}

export default Heading;