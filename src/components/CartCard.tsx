/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, Image } from 'react-native'
import { Color } from '../utils/Colors';
import { responsiveHeight, responsiveWidth } from '../utils/Responsive_Dimensions';
import AppText from './AppTextComps/AppText';
import AppColors from '../utils/AppColors';
import LineBreak from './LineBreak';
import { CounterRedux } from './Counter';

const CartCard = ({ salonId, productId, productName, productImage, price,stock }) => {
    return (
        <View style={{ borderWidth: 1, borderColor: Color('gold'), backgroundColor: Color('lightTheme'), borderRadius: 10, paddingHorizontal: responsiveWidth(2), paddingVertical: responsiveHeight(1) }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', gap: responsiveWidth(4), alignItems: 'center' }}>
                    <Image source={{ uri: productImage }} style={{ width: 70, height: 70, borderRadius: 10 }} />
                    <View>
                        <AppText
                            title={productName}
                            textSize={2}
                            textColor={AppColors.WHITE}
                            textFontWeight
                        />
                        <LineBreak space={0.5} />
                        <AppText
                            title={`$${price}.00`}
                            textSize={1.8}
                            textColor={AppColors.WHITE}
                        />
                    </View>
                </View>

                <View>
                    <CounterRedux stock={stock} salonId={salonId} productId={productId} productName={productName} productImage={productImage} />
                </View>
            </View>
        </View>
    );
};

export default CartCard;