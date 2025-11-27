/* eslint-disable react-native/no-inline-styles */
import { View, Text, Image, FlatList } from 'react-native';
import React from 'react';
import AppHeader from '../../../components/AppHeader';
import Background from '../../../utils/Background';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';
import { ImageBaseUrl } from '../../../assets/Utils/BaseUrl';
import APPImages from '../../../assets/APPImages';
import LineBreak from '../../../components/LineBreak';
import AppText from '../../../components/AppTextComps/AppText';
import AppColors from '../../../utils/AppColors';
import StyleButton from '../../../components/StyleButton';

const OrderDetails = ({ navigation, route }) => {
  const { salonId, product, subTotal } = route?.params?.data;
  console.log('product', route?.params?.data);
  return (
    <Background>
      <AppHeader
        title="Order Details"
        showFvrtIcon={false}
        onPress={() => navigation.goBack()}
      />
      <FlatList
        data={product}
        ItemSeparatorComponent={() => (
          <View
            style={{
              borderWidth: 1.5,
              borderColor: AppColors.themeColor,
              marginVertical: responsiveHeight(1),
            }}
          />
        )}
        keyExtractor={(item, index) => item?.productId?._id || index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginVertical: responsiveHeight(2),
              backgroundColor: AppColors.CARD,
              borderRadius: 15,
              padding: responsiveWidth(3),
            }}
          >
            <Image
              source={{
                uri: `${ImageBaseUrl}${item?.productId?.images?.[0]}`,
              }}
              style={{
                width: '100%',
                height: responsiveHeight(25),
                borderRadius: 10,
              }}
            />
            <LineBreak space={4} />

            <AppText
              title={item?.productId?.productName}
              textSize={2.6}
              textFontWeight
              textColor={AppColors.themeColor}
            />
            <AppText
              title={`Quantity: ${item.quantity}`}
              textColor={AppColors.WHITE}
              textSize={2.2}
            />
            <AppText
              title={`Price: $${item?.productId?.price}`}
              textColor={AppColors.WHITE}
              textSize={2.2}
            />

            <StyleButton
              style={{ marginTop: responsiveHeight(2) }}
              onPress={() =>
                navigation.navigate('RateYourExperience', {
                  productRating: true,
                  productId: item?.productId?._id,
                  salonId: salonId,
                })
              }
            >
              Give Ratings
            </StyleButton>
          </View>
        )}
      />
    </Background>
  );
};

export default OrderDetails;
