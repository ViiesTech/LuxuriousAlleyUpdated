/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import Background from '../../../utils/Background';
import { useNavigation } from '@react-navigation/native';
import AppHeader from '../../../components/AppHeader';
import { AppIcons } from '../../../assets/Icons';
import SVGXml from '../../../components/SVGXML';
import AppColors from '../../../utils/AppColors';
import AppText from '../../../components/AppTextComps/AppText';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';
import { Color } from '../../../utils/Colors';
import LineBreak from '../../../components/LineBreak';

const data = [
  {
    id: 1,
    title: 'Booking Appointment',
    subTitle: 'Your Booking Appointment has been',
    time: '34 minutes ago',
    icon: AppIcons.hair,
  },
  {
    id: 2,
    title: 'Products',
    subTitle: 'Your order is still in Process',
    time: '2 hours ago',
    icon: AppIcons.shopping,
  },
  {
    id: 3,
    title: 'Booking Appointment',
    subTitle: 'Your Booking Appointment has been',
    time: '34 minutes ago',
    icon: AppIcons.hair,
  },
  {
    id: 4,
    title: 'Offers',
    subTitle: 'Get additional Discounts when you',
    time: 'A day ago',
    icon: AppIcons.discount,
  },
  {
    id: 5,
    title: 'Products',
    subTitle: 'Your order has been Cancelled',
    time: '2 days ago',
    icon: AppIcons.shopping,
  },
  {
    id: 6,
    title: 'Products',
    subTitle: 'Your order is still in Process',
    time: '4 days ago',
    icon: AppIcons.shopping,
  },
  {
    id: 7,
    title: 'Offers',
    subTitle: '30% Discount on Berlinne The Must ….',
    time: '34 minutes ago',
    icon: AppIcons.discount,
  },
  {
    id: 8,
    title: 'Booking Appointment',
    subTitle: 'Your Booking Appointment has been',
    time: '34 minutes ago',
    icon: AppIcons.hair,
  },
];

const Notification = () => {
  const navigation = useNavigation();

  return (
    <Background>
      <AppHeader onPress={() => navigation.goBack()} title="Notification" />

      <FlatList
        data={data}
        ListFooterComponent={<LineBreak space={2} />}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              gap: responsiveWidth(4),
            }}
          >
            <View
              style={{
                borderWidth: 1,
                borderColor: Color('gold'),
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                backgroundColor: Color('lightTheme'),
                marginVertical: responsiveHeight(1),
              }}
            >
              <SVGXml icon={item.icon} width={25} height={25} />
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: AppColors.WHITE,
                width: responsiveWidth(90),
                paddingVertical: responsiveHeight(1),
              }}
            >
              <AppText
                title={item.title}
                textColor={AppColors.DARKGRAY}
                textSize={2}
              />
              <AppText
                title={item.subTitle}
                textColor={AppColors.WHITE}
                textSize={2}
              />
              <LineBreak space={0.5} />
              <AppText
                title={item.time}
                textColor={AppColors.DARKGRAY}
                textSize={1.5}
              />
            </View>
          </View>
        )}
      />
    </Background>
  );
};

export default Notification;
