/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import { Color } from '../utils/Colors';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils/Responsive_Dimensions';
import AppColors from '../utils/AppColors';
import LineBreak from './LineBreak';
import AppText from './AppTextComps/AppText';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = {
    item?: any;
    onCardPress?: any;
    isChangedCartPosition: any,
}

const ProductCard = ({ item, onCardPress, isChangedCartPosition }: Props) => {
    return (
        <TouchableOpacity
            style={{
                borderWidth: 1,
                borderColor: Color('gold'),
                paddingHorizontal: responsiveWidth(3),
                paddingVertical: responsiveHeight(1.5),
                borderRadius: 10,
                backgroundColor: AppColors.light_blue,
            }}
            onPress={onCardPress}
        >
            <Image
                source={item.image}
                style={{ width: 140, height: 140, borderRadius: 10 }}
            />
            <LineBreak space={2} />

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <View>
                    <AppText
                        title={item.name}
                        textColor={AppColors.WHITE}
                        textSize={1.8}
                    />
                    <LineBreak space={0.5} />
                    <AppText
                        title={item.price}
                        textColor={AppColors.DARKGRAY}
                        textSize={1.5}
                    />
                </View>
            </View>

            <View style={{ position: 'absolute', right: responsiveWidth(4), bottom: isChangedCartPosition ? responsiveHeight(6) : responsiveHeight(2) }}>
                <TouchableOpacity
                    style={{
                        width: 40,
                        height: 40,
                        backgroundColor: Color('gold'),
                        borderRadius: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: AppColors.WHITE,
                    }}
                >
                    <MaterialIcons
                        name={'shopping-cart'}
                        color={AppColors.BLACK}
                        size={responsiveFontSize(2.5)}
                    />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

export default ProductCard;