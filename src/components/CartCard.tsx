/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, Image } from 'react-native'
import { Color } from '../utils/Colors';
import APPImages from '../assets/APPImages';
import { responsiveHeight, responsiveWidth } from '../utils/Responsive_Dimensions';
import AppText from './AppTextComps/AppText';
import AppColors from '../utils/AppColors';
import LineBreak from './LineBreak';
import Counter from './Counter';

const CartCard = () => {
    return (
        <View style={{ borderWidth: 1, borderColor: Color('gold'), backgroundColor: Color('lightTheme'), borderRadius: 10, paddingHorizontal: responsiveWidth(2), paddingVertical: responsiveHeight(1) }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', gap: responsiveWidth(4), alignItems: 'center' }}>
                    <Image source={APPImages.DISCOUNT} style={{ width: 70, height: 70, borderRadius: 10 }} />
                    <View>
                        <AppText
                            title="Deep mask"
                            textSize={2}
                            textColor={AppColors.WHITE}
                            textFontWeight
                        />
                        <LineBreak space={0.5} />
                        <AppText
                            title="$25.00"
                            textSize={1.8}
                            textColor={AppColors.WHITE}
                        />
                    </View>
                </View>

                <View>
                    <Counter />
                </View>
            </View>
        </View>
    );
};

export default CartCard;