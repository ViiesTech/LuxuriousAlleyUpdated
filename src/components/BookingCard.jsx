/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Image, TouchableOpacity, FlatList } from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive_Dimensions';
import AppText from './AppTextComps/AppText';
import AppColors from '../utils/AppColors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import LineBreak from './LineBreak';
import AppButton from './AppButton';
import { Color } from '../utils/Colors';
import StyleButton from './StyleButton';
import APPImages from '../assets/APPImages';
type props = {
  img?: any,
  title?: string,
  location?: string,
  date?: any,
  service?: any,
  bookingType?: any,
  item?: any,
  showBtnSideBySide?: false,
  ratingToSalon?: false,
  disabled?: false,
  cancelBookingOnPress?: () => void,
};

const ratingsStar = [
  { id: 1, iconName: 'staro' },
  { id: 2, iconName: 'staro' },
  { id: 3, iconName: 'staro' },
  { id: 4, iconName: 'staro' },
  { id: 5, iconName: 'staro' },
];

const BookingCard = ({
  img,
  location,
  title,
  date,
  service,
  bookingType,
  item,
  showBtnSideBySide,
  ratingToSalon,
  disabled,
  cancelBookingOnPress,
}: props) => {
  const navigation = useNavigation();
  console.log('first', item);
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => navigation.navigate('HomeDetails')}
    >
      <View
        style={{
          padding: 20,
          paddingTop: 10,
          borderRadius: 10,
          width: responsiveWidth(90),
          alignSelf: 'center',
          borderWidth: 1,
          borderColor: Color('gold'),
          backgroundColor: Color('lightTheme'),
        }}
      >
        <View
          style={
            bookingType === 'canceled'
              ? { flexDirection: 'row', justifyContent: 'space-between' }
              : {}
          }
        >
          <AppText
            title={date}
            textColor={AppColors.WHITE}
            textSize={1.5}
            textFontWeight
          />
          {bookingType === 'canceled' && (
            <AppText
              title={'Canceled'}
              textColor={Color('gold')}
              textSize={1.5}
            />
          )}
        </View>
        <LineBreak space={1} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Image
            source={img}
            style={{
              height: responsiveHeight(10),
              width: responsiveHeight(10),
              // resizeMode: 'contain',
              borderRadius: 10,
              marginRight: 10,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: responsiveWidth(60),
            }}
          >
            <View style={{ gap: 5 }}>
              <AppText
                title={title}
                textColor={AppColors.WHITE}
                textSize={2}
                textFontWeight
              />
              <AppText
                title={location}
                textSize={2}
                textColor={AppColors.DARKGRAY}
              />
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
              >
                <AppText
                  title={'Services:'}
                  textSize={2}
                  textColor={AppColors.DARKGRAY}
                />
                <AppText
                  title={service}
                  textSize={2}
                  textColor={AppColors.DARKGRAY}
                />
              </View>
            </View>
          </View>
        </View>

        <LineBreak space={2} />

        {bookingType === 'up_coming' && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <AppButton
              title="Cancel Booking"
              bgColor="transparent"
              textColor={AppColors.WHITE}
              borderWidth={1}
              borderColor={Color('gold')}
              handlePress={cancelBookingOnPress}
            />

            <View>
              <StyleButton
                onPress={() =>
                  navigation.navigate('DownloadReceipt', {
                    data: item,
                    isProductReceipt: false,
                  })
                }
                btnWidth={responsiveWidth(35)}
                btnHeight={responsiveHeight(5.5)}
                justifyContent={'center'}
                alignItems={'center'}
                fontSize={2}
                color={AppColors.BLACK}
                background={APPImages.view_receipt}
              >
                View Receipt
              </StyleButton>
            </View>
          </View>
        )}

        {bookingType === 'completed' && (
          <View>
            <FlatList
              data={ratingsStar}
              contentContainerStyle={{
                paddingHorizontal: responsiveWidth(5),
                flex: 1,
                justifyContent: 'space-between',
              }}
              horizontal
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity>
                    <AntDesign
                      name={item.iconName}
                      size={responsiveFontSize(4)}
                      color={Color('gold')}
                    />
                  </TouchableOpacity>
                );
              }}
            />

            <LineBreak space={2} />
            {showBtnSideBySide ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: responsiveHeight(2),
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('RateYourExperience', {
                      productRating: false,
                      productId: null,
                      salonId: item?.salonId?._id,
                    })
                  }
                  style={{
                    backgroundColor: 'transparent',
                    padding: responsiveHeight(1.6),
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1.5,
                    borderColor: AppColors.themeColor,
                    borderRadius: responsiveHeight(1.5),
                    width: responsiveWidth(38),
                  }}
                >
                  <AppText
                    title="Give Rating"
                    textColor={AppColors.WHITE}
                    textSize={2}
                    textFontWeight
                  />
                </TouchableOpacity>
                <StyleButton
                  onPress={() =>
                    navigation.navigate('DownloadReceipt', {
                      data: item,
                      isProductReceipt: false,
                    })
                  }
                  btnWidth={responsiveWidth(36)}
                  btnHeight={responsiveHeight(6.2)}
                  justifyContent={'center'}
                  alignItems={'center'}
                  fontSize={2}
                  color={AppColors.BLACK}
                  background={APPImages.view_receipt}
                >
                  View Receipt
                </StyleButton>
              </View>
            ) : (
              <View>
                <StyleButton
                  onPress={() =>
                    navigation.navigate('DownloadReceipt', { data: item })
                  }
                >
                  View Receipt
                </StyleButton>
              </View>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default BookingCard;
