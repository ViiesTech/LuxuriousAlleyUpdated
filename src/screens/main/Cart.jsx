/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, FlatList } from 'react-native';
import Background from '../../utils/Background';
import { useNavigation } from '@react-navigation/native';
import AppHeader from '../../components/AppHeader';
import CartCard from '../../components/CartCard';
import LineBreak from '../../components/LineBreak';
import AppText from '../../components/AppTextComps/AppText';
import AppColors from '../../utils/AppColors';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import { Color } from '../../utils/Colors';
import StyleButton from '../../components/StyleButton';
import { useSelector } from 'react-redux';

const Cart = () => {
  const navigation = useNavigation();
  const { grandTotal, cart } = useSelector(state => state.cart);
  const currentSalonCart = cart.length > 0 ? cart[0] : null;
  const products = currentSalonCart ? currentSalonCart.products : [];
  const salonId = currentSalonCart ? currentSalonCart.salonId : null;

  console.log('Products:ss', products);
  console.log('SalonId:', salonId);
  console.log('GrandTotal:', grandTotal);

  return (
    <Background contentContainerStyle={{ flexGrow: 1 }}>
      <AppHeader
        onPress={() => navigation.goBack()}
        title={'Cart'}
        isHideFav={true}
      />
      <View style={{ flex: 1 }}>
        {products?.length ? (
          <>
            <FlatList
              data={products}
              ListHeaderComponent={
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginVertical: responsiveHeight(1),
                  }}
                >
                  <AppText
                    title="Product"
                    textSize={1.6}
                    textColor={AppColors.DARKGRAY}
                  />
                  <AppText
                    title="Quantity"
                    textSize={1.6}
                    textColor={AppColors.DARKGRAY}
                  />
                </View>
              }
              ItemSeparatorComponent={<LineBreak space={1} />}
              renderItem={({ item }) => (
                <CartCard
                  stock={item?.stock}
                  price={item?.price}
                  salonId={salonId}
                  productId={item?.productId}
                  productName={item?.productName}
                  productImage={item?.productImage}
                />
              )}
            />
            <LineBreak space={16} />

            <AppText
              title="Payment Summary"
              textSize={2}
              textColor={AppColors.WHITE}
            />
            <LineBreak space={1} />
            <View
              style={{
                backgroundColor: Color('cardColor'),
                paddingHorizontal: responsiveWidth(2),
                paddingVertical: responsiveHeight(2),
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  height: responsiveHeight(0.1),
                  backgroundColor: Color('gold'),
                }}
              />
              <LineBreak space={2} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <AppText
                  title="Total"
                  textSize={1.8}
                  textColor={AppColors.WHITE}
                />
                <AppText
                  title={`$${grandTotal}`}
                  textSize={1.8}
                  textColor={Color('gold')}
                />
              </View>
            </View>

            <LineBreak space={2} />

            <StyleButton
              color={AppColors.BLACK}
              onPress={() =>
                navigation.navigate('Checkout', {
                  isAddToCart: true,
                  salonId,
                  productId: null,
                  productName: null,
                  images: null,
                  price: null,
                  stock: null,
                  count: null,
                })
              }
            >{`Checkout`}</StyleButton>
            <LineBreak space={2} />
          </>
        ) : (
          <View style={{ flex: 0.6, justifyContent: 'center' }}>
            <AppText
              title="No Products Found"
              textColor={AppColors.themeColor}
              textSize={3}
              textAlignment={'center'}
            />
          </View>
        )}
      </View>
    </Background>
  );
};

export default Cart;
