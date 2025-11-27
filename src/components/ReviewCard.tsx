/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
    Image,
    ImageSourcePropType,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils/Responsive_Dimensions';
import { Color } from '../utils/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppColors from '../utils/AppColors';

interface reviewProps {
    image: ImageSourcePropType;
    name: string;
    day: string;
    desc: string;
    rating: string;
    local: string;
    style: ViewStyle;
}

const ReviewCard = (props: reviewProps) => {
    return (
        <TouchableOpacity disabled style={[styles.reviewStyle, props?.style]}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    <Image
                        style={styles.imageStyle}
                        source={props?.image}
                    />
                    <View>
                        <Text style={styles.name}>{props?.name}</Text>
                        <Text style={styles.day}>{props?.day}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <FontAwesome
                        name={'star'}
                        size={responsiveFontSize(2)}
                        color={Color('gold')}
                    />
                    <Text style={styles.ratingText}>{props?.rating}</Text>
                </View>
            </View>
            <Text numberOfLines={2} style={styles.desc}>{props?.desc}</Text>
        </TouchableOpacity>
    );
};

export default ReviewCard;

const styles = StyleSheet.create({
    reviewStyle: {
        borderWidth: 1,
        borderColor: Color('gold'),
        borderRadius: 10,
        width: responsiveWidth(70),
        height: responsiveHeight(15),
        maxHeight: responsiveHeight(16),
        padding: responsiveHeight(1.5),
        backgroundColor: Color('cardColor'),
    },
    imageStyle: {
        height: responsiveHeight(6),
        width: responsiveHeight(6),
        borderRadius: 100,
    },
    name: {
        color: AppColors.WHITE,
        fontWeight: 'bold',
        fontSize: responsiveFontSize(2),
    },
    day: {
        color: AppColors.DARKGRAY,
        fontSize: responsiveFontSize(1.8),
    },
    ratingText: {
        color: AppColors.WHITE,
        fontSize: responsiveFontSize(1.8),
    },
    desc: {
        width: responsiveWidth(65),
        marginTop: responsiveHeight(1),
        color: AppColors.DARKGRAY,
    },
});
