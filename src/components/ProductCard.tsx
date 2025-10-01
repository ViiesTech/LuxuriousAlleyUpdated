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
}

const ProductCard = ({ item, onCardPress }: Props) => {
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
                style={{ width: 150, height: 150, borderRadius: 10 }}
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
                        textSize={2}
                    />
                    <LineBreak space={0.5} />
                    <AppText
                        title={item.price}
                        textColor={AppColors.DARKGRAY}
                        textSize={1.8}
                        textwidth={20}
                    />
                </View>

                <TouchableOpacity
                    style={{
                        width: 40,
                        height: 40,
                        backgroundColor: Color('gold'),
                        borderRadius: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
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