import React from 'react';
import { Alert, Dimensions, Image, TouchableOpacity, View } from 'react-native';
import { Color } from '../utils/Colors';
import { Small } from '../../lux/src/components/Text';
import { RFValue } from 'react-native-responsive-fontsize';

const { width, height } = Dimensions.get('screen');

const Card = ({style, label, picture, address, distance, cWidth, onPress}: {onPress?: any, style?: any, label: 'string', picture: string, address: string, distance: string, cWidth?: number}) => {
    const cardWidth = cWidth || 160;
    const imgWidth = cardWidth - 10;
    const imgHeight = cardWidth - 10;
    const iconSize = 40;
    const iconImg = 15;

    return (
        <TouchableOpacity onPress={() => onPress()}>
            <View style={[{position: 'relative', backgroundColor: Color('gold'), padding: 5, width: cardWidth, borderRadius: 10}, style]}>
                <View style={{position: 'absolute', top: 10, left: 10, zIndex: 1}}>
                    <View style={{width: iconSize, height: iconSize, borderRadius: 100, backgroundColor: Color('modalBackground'), alignItems: 'center', justifyContent: 'center'}}>
                        <Image source={require('../../assets/chair.png')} style={{borderRadius: 10, width: iconImg, height: iconImg}} />
                    </View>
                </View>
                <View style={{position: 'absolute', top: 10, left: 55, zIndex: 1}}>
                    <View style={{width: iconSize, height: iconSize, borderRadius: 100, backgroundColor: Color('modalBackground'), alignItems: 'center', justifyContent: 'center'}}>
                        <Image source={require('../../assets/handbag.png')} style={{borderRadius: 10, width: iconImg, height: iconImg}} />
                    </View>
                </View>
                <Image source={{uri: picture}} style={{borderRadius: 10, width: imgWidth, height: imgHeight}} />
                <View style={{paddingLeft: width * 0.02, paddingTop: height * 0.015}}>
                    <Image source={require('../../assets/card-ratings.png')} style={{borderRadius: 10, position: 'absolute', top: -20, right: 10, width: height * 0.06, height: height * 0.06}} width={10} height={10} />
                    <View style={{flexDirection: 'row', flex: 1}}>
                        <Small numberOfLines={1} style={{fontSize: RFValue(12, height), flex: 2}}>{label}</Small>
                        <Small style={{flex: 1, opacity: 0}}>-</Small>
                    </View>
                    <View style={{flexDirection: 'row', flex: 1, gap: 5}}>
                        <Small numberOfLines={1} style={{flex: 2, fontSize: RFValue(12, height), opacity: 0.6}}>{address}</Small>
                        <Small style={{flex: 1, fontSize: RFValue(12, height)}}>({distance})</Small>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Card;