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

const Cart = () => {
  const navigation = useNavigation();

  return (
    <Background>
      <AppHeader
        onPress={() => navigation.goBack()}
        title={'Cart'}
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
          <AppText title="Total" textSize={1.8} textColor={AppColors.WHITE} />
          <AppText title="$75.00" textSize={1.8} textColor={Color('gold')} />
        </View>
      </View>

      <LineBreak space={2} />

      <StyleButton
        color={AppColors.BLACK}
        onPress={() => navigation.navigate('Checkout')}
      >{`Checkout`}</StyleButton>
      <LineBreak space={2} />
    </Background>
  );
};

export default Cart;
