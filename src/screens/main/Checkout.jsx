/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, FlatList } from 'react-native';
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

const summary = [
  { id: 1, title: 'Sub total', price: '$65.00' },
  { id: 2, title: 'Delivery', price: '$10.00' },
  { id: 3, title: 'Total', price: '$75.00' },
];

const Checkout = () => {
  const navigation = useNavigation();

  return (
    <Background>
      <AppHeader
        onPress={() => navigation.goBack()}
        title={'Checkout'}
        isHideFav={true}
      />
      <FlatList
        data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
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
        renderItem={({ item }) => <CartCard />}
      />

      <LineBreak space={2} />

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
          paddingVertical: responsiveHeight(1),
          borderWidth: 1,
          borderColor: Color('gold'),
          borderRadius: 10,
        }}
      >
        <FlatList
          data={summary}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: responsiveHeight(2),
                borderBottomWidth: item.id == 3 ? 0 : 0.5,
                borderBottomColor: Color('gold'),
              }}
            >
              <AppText
                title={item.title}
                textSize={1.8}
                textColor={AppColors.WHITE}
              />
              <AppText
                title={item.price}
                textSize={1.8}
                textColor={item.id == 3 ? Color('gold') : AppColors.WHITE}
              />
            </View>
          )}
        />
      </View>

      <LineBreak space={2} />

      <StyleButton
        color={AppColors.BLACK}
        onPress={() => navigation.navigate('SelectPaymentMethod', {isCheckout: true})}
      >{`Pay Now`}</StyleButton>
      <LineBreak space={2} />
    </Background>
  );
};

export default Checkout;
