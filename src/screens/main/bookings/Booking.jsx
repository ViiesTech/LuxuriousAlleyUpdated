/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import AppColors from '../../../utils/AppColors';
import { useNavigation } from '@react-navigation/native';
import AppHeader from '../../../components/AppHeader';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';
import LineBreak from '../../../components/LineBreak';
import AppText from '../../../components/AppTextComps/AppText';
import BookingCard from '../../../components/BookingCard';
import APPImages from '../../../assets/APPImages';
import CancelBookingModal from '../../../components/CancelBookingModal';
import BookingCanceledModal from '../../../components/BookingCanceledModal';
import Background from '../../../utils/Background';
import { Color } from '../../../utils/Colors';
import ProductCard from '../../../components/ProductCard';

const tabs = [
  { id: 1, title: 'Ongoing' },
  { id: 2, title: 'Completed' },
];

const mainTabs = [
  { id: 1, title: 'Bookings' },
  { id: 2, title: 'Products' },
];

const upcomingData = [
  {
    id: 1,
    img: APPImages.NAILS,
    title: 'Nails',
    location: 'Lakewood, California ',
    date: 'Sep 10, 2024 - 9:30 AM',
    service: 'Dip Powder Nails',
  },
  {
    id: 2,
    img: APPImages.CENTRALSALOONS,
    title: 'Central Salon',
    location: 'Lakewood, California ',
    date: 'Sep 10, 2024 - 9:30 AM',
    service: 'Dip Powder Nails',
  },
];

const product = [
  {
    id: 1,
    image: APPImages.product,
    name: 'Deep Mask',
    price: '9:00 to 10:00 - Oct/25/23',
  },
  {
    id: 2,
    image: APPImages.product,
    name: 'Deep Mask',
    price: '9:00 to 10:00 - Oct/25/23',
  },
  {
    id: 3,
    image: APPImages.product,
    name: 'Deep Mask',
    price: '9:00 to 10:00 - Oct/25/23',
  },
  {
    id: 4,
    image: APPImages.product,
    name: 'Deep Mask',
    price: '9:00 to 10:00 - Oct/25/23',
  },
  {
    id: 5,
    image: APPImages.product,
    name: 'Deep Mask',
    price: '9:00 to 10:00 - Oct/25/23',
  },
];

const completedProduct = [
  {
    id: 1,
    image: APPImages.product,
    name: 'Deep Mask',
    price: 'Delivered',
  },
  {
    id: 2,
    image: APPImages.product,
    name: 'Deep Mask',
    price: 'Delivered',
  },
  {
    id: 3,
    image: APPImages.product,
    name: 'Deep Mask',
    price: 'Delivered',
  },
  {
    id: 4,
    image: APPImages.product,
    name: 'Deep Mask',
    price: 'Delivered',
  },
  {
    id: 5,
    image: APPImages.product,
    name: 'Deep Mask',
    price: 'Delivered',
  },
];

const Booking = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState({ id: 1 });
  const [selectedTopTab, setSelectedTopTab] = useState({ id: 1 });
  const [showCancelBookingModal, setShowCancelBookingModal] = useState(false);
  const [showSuccessCancelBookingModal, setShowSuccessCancelBookingModal] =
    useState(false);

  return (
    <Background>
      <AppHeader onPress={() => navigation.goBack()} title="Shop & Book" />

      <CancelBookingModal
        visible={showCancelBookingModal}
        handleAppointmentButtonPress={() => {
          setShowCancelBookingModal(false);
          setShowSuccessCancelBookingModal(true);
        }}
        handleCancelButtonPress={() => {
          setShowCancelBookingModal(false);
          setShowSuccessCancelBookingModal(true);
        }}
      />

      <BookingCanceledModal
        visible={showSuccessCancelBookingModal}
        handlePress={() => {
          setShowSuccessCancelBookingModal(false);
          setShowSuccessCancelBookingModal(false);
        }}
      />

      <View>
        <FlatList
          data={mainTabs}
          horizontal
          contentContainerStyle={{ gap: 15 }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => setSelectedTopTab({ id: item.id })}
              >
                <AppText
                  title={item.title}
                  textSize={2.4}
                  textwidth={45}
                  textAlignment={'center'}
                  textColor={
                    selectedTopTab.id === item.id
                      ? Color('gold')
                      : AppColors.DARKGRAY
                  }
                  borderBottomWidth={selectedTopTab.id === item.id ? 3 : 0}
                  borderBottomColor={
                    selectedTopTab.id === item.id ? Color('gold') : null
                  }
                  paddingBottom={responsiveHeight(0.5)}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <LineBreak space={2} />

      <View>
        <FlatList
          data={tabs}
          horizontal
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            gap: responsiveWidth(10),
            alignItems: 'center',
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => setSelectedTab({ id: item.id })}>
                <AppText
                  title={item.title}
                  textSize={2.4}
                  textColor={
                    selectedTab.id === item.id
                      ? Color('gold')
                      : AppColors.DARKGRAY
                  }
                  borderBottomWidth={selectedTab.id === item.id ? 3 : 0}
                  borderBottomColor={
                    selectedTab.id === item.id ? Color('gold') : null
                  }
                  paddingBottom={responsiveHeight(0.5)}
                />
              </TouchableOpacity>
            );
          }}
        />

        <LineBreak space={2} />

        {selectedTab.id === 1 && selectedTopTab.id === 1 && (
          <FlatList
            data={upcomingData}
            ItemSeparatorComponent={<LineBreak space={2} />}
            renderItem={({ item }) => {
              return (
                <BookingCard
                  title={item.title}
                  img={item.img}
                  location={item.location}
                  date={item.date}
                  service={item.service}
                  bookingType="up_coming"
                  cancelBookingOnPress={() => setShowCancelBookingModal(true)}
                />
              );
            }}
          />
        )}

        {selectedTab.id === 2 && selectedTopTab.id === 1 && (
          <FlatList
            data={upcomingData}
            ItemSeparatorComponent={<LineBreak space={2} />}
            renderItem={({ item }) => {
              return (
                <BookingCard
                  title={item.title}
                  img={item.img}
                  location={item.location}
                  date={item.date}
                  service={item.service}
                  bookingType={item.id == 1 ? 'canceled' : 'completed'}
                />
              );
            }}
          />
        )}

        {selectedTab.id === 1 && selectedTopTab.id === 2 && (
          <FlatList
            data={product}
            numColumns={2}
            contentContainerStyle={{ gap: responsiveHeight(2) }}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <ProductCard
                item={item}
                isChangedCartPosition={true}
                onCardPress={() => navigation.navigate('ProductDetails')}
              />
            )}
          />
        )}

        {selectedTab.id === 2 && selectedTopTab.id === 2 && (
          <FlatList
            data={completedProduct}
            numColumns={2}
            contentContainerStyle={{ gap: responsiveHeight(2) }}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <ProductCard
                item={item}
                isChangedCartPosition={true}
                onCardPress={() => navigation.navigate('ProductDetails')}
              />
            )}
          />
        )}
      </View>
    </Background>
  );
};

export default Booking;
