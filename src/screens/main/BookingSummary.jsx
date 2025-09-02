/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import AppColors from '../../utils/AppColors';
import AppHeader from '../../components/AppHeader';
import { useNavigation } from '@react-navigation/native';
import SaloonsCard from '../../components/SaloonsCard';
import APPImages from '../../assets/APPImages';
import LineBreak from '../../components/LineBreak';
import AppText from '../../components/AppTextComps/AppText';
import { responsiveFontSize } from '../../utils/Responsive_Dimensions';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Background from '../../utils/Background';
import { Color } from '../../utils/Colors';
import StyleButton from '../../components/StyleButton';

const bookingDetails = [
  { id: 1, title: 'Date', date: 'Wed, Sep 10 at 9:30 AM' },
  { id: 2, title: 'Stylist', date: 'Any stylist - 40 Mins' },
];

const paymentDetails = [
  { id: 1, title: 'Pay Online Now', subTitle: 'Secure your booking instantly' },
  {
    id: 2,
    title: 'Pay at Salon',
    subTitle: 'Settle payment after your appointment',
  },
];

const pricingDetails = [
  { id: 1, title: 'Dip Powder Nails', amount: '$10.00' },
  { id: 2, title: 'Dip Powder Nails', amount: '$5.00' },
  { id: 3, title: 'Discount', amount: '$3.00' },
  { id: 4, title: 'Total', amount: '$12.00' },
];

const BookingSummary = () => {
  const navigation = useNavigation();
  const [paymentType, setPaymentType] = useState({ id: 1 });

  return (
    <Background>
      <AppHeader onPress={() => navigation.goBack()} title="Booking Summary" />

      <LineBreak space={1.5} />

      <FlatList
        data={[
          {
            id: 1,
            img: APPImages.NAILS,
            title: 'Dip Powder Nails',
            location: 'Los Angeles, California',
            KM: 2,
            Rating: 4.7,
            TotalNoOfRating: 321,
          },
        ]}
        renderItem={({ item }) => {
          return (
            <SaloonsCard
              title={item.title}
              KM={item.KM}
              Rating={item.Rating}
              TotalNoOfRating={item.TotalNoOfRating}
              img={item.img}
              location={item.location}
            />
          );
        }}
      />

      <View
        style={{
          backgroundColor: Color('themeColor'),
        }}
      >
        <LineBreak space={2} />

        <AppText
          title="Booking details"
          textSize={2.5}
          textColor={AppColors.WHITE}
          textFontWeight
        />

        <LineBreak space={1.5} />

        <FlatList
          data={bookingDetails}
          ItemSeparatorComponent={<LineBreak space={1} />}
          renderItem={({ item }) => {
            return (
              <View>
                <AppText
                  title={item.title}
                  textSize={2}
                  textColor={AppColors.WHITE}
                />
                <AppText
                  title={item.date}
                  textSize={1.7}
                  textColor={AppColors.DARKGRAY}
                />
              </View>
            );
          }}
        />

        <LineBreak space={2} />

        <AppText
          title="Payment"
          textSize={2.5}
          textColor={AppColors.WHITE}
          textFontWeight
        />

        <LineBreak space={1.5} />

        <FlatList
          data={paymentDetails}
          ItemSeparatorComponent={<LineBreak space={1} />}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                onPress={() => setPaymentType({ id: item.id })}
              >
                <View>
                  <AppText
                    title={item.title}
                    textSize={2}
                    textColor={AppColors.WHITE}
                  />
                  <AppText
                    title={item.subTitle}
                    textSize={1.7}
                    textColor={AppColors.DARKGRAY}
                  />
                </View>
                <Fontisto
                  name={
                    paymentType.id === item.id
                      ? 'radio-btn-active'
                      : 'radio-btn-passive'
                  }
                  size={responsiveFontSize(2.5)}
                  color={
                    paymentType.id === item.id
                      ? Color('gold')
                      : AppColors.DARKGRAY
                  }
                />
              </TouchableOpacity>
            );
          }}
        />

        <LineBreak space={4} />

        <AppText
          title="Price Details"
          textSize={2.5}
          textColor={AppColors.WHITE}
          textFontWeight
        />

        <LineBreak space={1.5} />

        <FlatList
          data={pricingDetails}
          ItemSeparatorComponent={<LineBreak space={1} />}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: item.title === 'Total' ? 10 : 0,
                }}
              >
                <AppText
                  title={item.title}
                  textSize={item.title === 'Total' ? 2.2 : 1.7}
                  textColor={
                    item.title === 'Total'
                      ? AppColors.WHITE
                      : AppColors.DARKGRAY
                  }
                  textFontWeight={item.title === 'Total' ? true : false}
                />
                <AppText
                  title={item.amount}
                  textSize={item.title === 'Total' ? 2.2 : 1.7}
                  textColor={
                    item.title === 'Total'
                      ? AppColors.WHITE
                      : AppColors.DARKGRAY
                  }
                  textFontWeight={item.title === 'Total' ? true : false}
                />
              </TouchableOpacity>
            );
          }}
        />

        <LineBreak space={4} />

        <View>
          <StyleButton
            onPress={() => navigation.navigate('SelectPaymentMethod')}
          >
            Proceed
          </StyleButton>
        </View>

        <LineBreak space={2} />
      </View>
    </Background>
  );
};

export default BookingSummary;
