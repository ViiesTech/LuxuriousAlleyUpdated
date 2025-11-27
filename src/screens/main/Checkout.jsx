/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, FlatList, Image, ActivityIndicator } from 'react-native';
import Background from '../../utils/Background';
import { useNavigation } from '@react-navigation/native';
import AppHeader from '../../components/AppHeader';
import StyleButton from '../../components/StyleButton';
import AppColors from '../../utils/AppColors';
import LineBreak from '../../components/LineBreak';
import AppText from '../../components/AppTextComps/AppText';
import { Color } from '../../utils/Colors';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import CartCard from '../../components/CartCard';
import { Counter } from '../../components/Counter';
import { ImageBaseUrl } from '../../assets/Utils/BaseUrl';
import { useSelector } from 'react-redux';
import PaymentSummary from '../../components/PaymentSummary';
import moment from 'moment';
import { createProductOrder, ShowToast } from '../../GlobalFunctions';

const Checkout = ({ route }) => {
  const navigation = useNavigation();
  const {
    isAddToCart,
    salonId,
    productId,
    price,
    productName,
    images,
    count,
    stock,
  } = route?.params;
  const [currentCount, setCurrentCount] = useState(count);
  const finalTotal = price * currentCount;
  const { _id } = useSelector(state => state?.user?.userData);

  const { grandTotal, cart } = useSelector(state => state.cart);
  const currentSalonCart = cart.length > 0 ? cart[0] : null;
  const products = currentSalonCart ? currentSalonCart.products : [];
  const salonIdRedux = currentSalonCart ? currentSalonCart.salonId : null;
  const todayDate = moment().format('DD-MM-YYYY');
  const [isLoading, setIsLoading] = useState(false);
  console.log('todayDate', todayDate);

  console.log('_id', _id);

  const summary = [
    {
      id: 1,
      title: 'Sub total',
      price: `$${isAddToCart ? grandTotal : finalTotal}`,
    },
    { id: 2, title: 'Delivery', price: '$10.00' },
    {
      id: 3,
      title: 'Total',
      price: `$${(isAddToCart ? grandTotal : finalTotal) + 10}`,
    },
  ];
  console.log('Products:', products);
  // console.log('SalonId:', salonId);
  console.log('GrandTotal:', grandTotal);
  console.log('route?.params', route?.params);

  const createOrderHandler = async (salonId, products, total) => {
    const filteredProducts = products.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
    }));
    setIsLoading(true);
    try {
      const response = await createProductOrder(
        _id,
        salonId,
        filteredProducts,
        todayDate,
        total + 10,
      );
      console.log('response.dataaa', response?.data);
      setIsLoading(false);
      ShowToast(response?.success ? 'success' : 'error', response?.message);
      if (response?.success) {
        navigation.navigate('Home');
      }
    } catch (error) {
      setIsLoading(false);
      ShowToast('error', error?.response?.data?.message);
    }
    console.log('salonId', salonId);
    console.log('filteredProducts', filteredProducts);
    console.log('total', total + 10);
    // console.log('first')
  };
  return (
    <Background>
      <AppHeader
        onPress={() => navigation.goBack()}
        title={'Checkout'}
        isHideFav={true}
      />
      {isAddToCart ? (
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
        </>
      ) : (
        <View>
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
          {/* <CartCard salonId={salonId} stock={stock}/> */}
          <View
            style={{
              borderWidth: 1,
              borderColor: Color('gold'),
              backgroundColor: Color('lightTheme'),
              borderRadius: 10,
              paddingHorizontal: responsiveWidth(2),
              paddingVertical: responsiveHeight(1),
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  gap: responsiveWidth(4),
                  alignItems: 'center',
                }}
              >
                <Image
                  source={{ uri: `${ImageBaseUrl}${images?.[0]}` }}
                  style={{ width: 70, height: 70, borderRadius: 10 }}
                />
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
                <Counter
                  stock={stock}
                  count={currentCount}
                  setCount={setCurrentCount}
                />
              </View>
            </View>
          </View>
        </View>
      )}

      <LineBreak space={2} />

      <AppText
        title="Payment Summary"
        textSize={2}
        textColor={AppColors.WHITE}
      />
      <LineBreak space={1} />
      <PaymentSummary summary={summary} />
      <LineBreak space={2} />

      <StyleButton
        color={AppColors.BLACK}
        onPress={
          () =>
            isAddToCart
              ? createOrderHandler(salonIdRedux, products, grandTotal)
              : createOrderHandler(
                  salonId,
                  [{ productId, quantity: currentCount }],
                  finalTotal,
                )
          // navigation.navigate('SelectPaymentMethod', { isCheckout: true })
          // console.log('products',products)
        }
      >
        {isLoading ? (
          <ActivityIndicator size={'large'} color={AppColors.BLACK} />
        ) : (
          `Pay Now`
        )}
      </StyleButton>
      <LineBreak space={2} />
    </Background>
  );
};

export default Checkout;
