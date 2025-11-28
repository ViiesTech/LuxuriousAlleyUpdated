/* eslint-disable react-native/no-inline-styles */
// /* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveWidth } from '../utils/Responsive_Dimensions';
import { Color } from '../utils/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppColors from '../utils/AppColors';
import AppText from './AppTextComps/AppText';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/CartSlice';

const CounterRedux = ({ salonId, productId, productName, productImage, stock, price }) => {
    const dispatch = useDispatch();
    console.log('productId', productId)
    console.log('productName', productName)
    console.log('productImage', productImage)
    const { cart } = useSelector(state => state.cart);

    const salonCart = cart.find(s => s.salonId === salonId);
    const cartProduct = salonCart?.products?.find(p => p.productId === productId);

    const quantity = cartProduct?.quantity > 0 ? cartProduct.quantity : 1;

    const handleIncrease = () => {
        if (quantity < stock) {
            dispatch(
                addToCart({
                    salonId,
                    product: {
                        productId,
                        quantity: 1, // increment by 1
                        stock,
                        price,
                        productName,
                        productImage,
                    },
                }),
            );
        }
    };

    const handleDecrease = () => {
        if (cartProduct) {
            dispatch(
                addToCart({
                    salonId,
                    product: {
                        productId,
                        quantity: -1, // decrement by 1
                        stock,
                    },
                }),
            );
        }
    };

    return (
        <View
            style={{
                flexDirection: 'row',
                gap: responsiveWidth(4),
                alignItems: 'center',
            }}>
            <TouchableOpacity
                style={[styles.btnContainer, { opacity: quantity <= 0 ? 0.5 : 1 }]}
                disabled={quantity <= 0}
                onPress={handleDecrease}>
                <AntDesign name="minus" size={responsiveFontSize(2)} color={Color('gold')} />
            </TouchableOpacity>

            <AppText title={quantity.toString()} textSize={2.2} textColor={AppColors.WHITE} />

            <TouchableOpacity
                style={[styles.btnContainer, { opacity: quantity >= stock ? 0.5 : 1 }]}
                disabled={quantity >= stock}
                onPress={handleIncrease}>
                <AntDesign name="plus" size={responsiveFontSize(2)} color={Color('gold')} />
            </TouchableOpacity>
        </View>
    );
};


const Counter = ({ count, setCount, stock }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <TouchableOpacity
                style={[styles.btnContainer, { opacity: count <= 1 ? 0.5 : 1 }]}
                disabled={count <= 1}
                onPress={() => setCount(count - 1)}>
                <AntDesign name="minus" size={18} color="gold" />
            </TouchableOpacity>

            <AppText title={count.toString()} textSize={2.2} textColor={AppColors.WHITE} />

            <TouchableOpacity
                style={[styles.btnContainer, { opacity: count >= stock ? 0.5 : 1 }]}
                disabled={count >= stock}
                onPress={() => setCount(count + 1)}>
                <AntDesign name="plus" size={18} color="gold" />
            </TouchableOpacity>
        </View>
    );
};


export { CounterRedux, Counter }
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