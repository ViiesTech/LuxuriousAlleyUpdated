/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
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
import { useSelector } from 'react-redux';
import { ImageBaseUrl } from '../../assets/Utils/BaseUrl';
import { createAppointment, ShowToast } from '../../GlobalFunctions';
import ConfirmationModal from '../../components/ConfirmationModal';

// const bookingDetails = [
//   { id: 1, title: 'Date', date: 'Wed, Sep 10 at 9:30 AM' },
//   { id: 2, title: 'Stylist', date: 'Any stylist - 40 Mins' },
// ];

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
  { id: 2, title: 'Total', amount: '$12.00' },
];

const BookingSummary = ({ route }) => {
  const navigation = useNavigation();
  const [paymentType, setPaymentType] = useState({ id: 2 });
  const { _id } = useSelector(state => state.user.userData);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingAppointmentResponse, setBookingAppointmentResponse] =
    useState();
  const {
    stylistId,
    stylistName,
    serviceId,
    salonId,
    servicePrice,
    date,
    time,
  } = route?.params;
  const [visibleConfirmationModal, setVisibleConfirmationModal] =
    useState(false);
  // const { salon } = route?.params?.salonId;
  console.log('serviceId.price', serviceId.price);

  const createBookingHandler = async () => {
    setIsLoading(true);
    try {
      const response = await createAppointment(
        _id,
        salonId._id,
        serviceId.id,
        stylistId,
        date,
        time,
        serviceId.price,
      );
      setIsLoading(false);
      if (response?.success) {
        setVisibleConfirmationModal(true);
      }
      setBookingAppointmentResponse(response?.data);
      console.log('ressspssss', response);
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <Background>
      <AppHeader onPress={() => navigation.goBack()} title="Booking Summary" />

      <LineBreak space={1.5} />

      <FlatList
        data={[
          {
            id: 1,
            img: salonId?.bImage,
            title: salonId?.bName,
            location: salonId?.bLocationName,
            KM: 2,
            Rating: salonId?.avgRating,
            TotalNoOfRating: salonId?.totalReviews,
          },
        ]}
        renderItem={({ item }) => {
          return (
            <SaloonsCard
              title={item.title}
              KM={item.KM}
              Rating={`{${Number(item?.Rating)?.toFixed(2)})`}
              TotalNoOfRating={item.TotalNoOfRating}
              img={`${ImageBaseUrl}${item.img}`}
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

        {/* <FlatList
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
        /> */}
        <View>
          <AppText title="Date" textSize={2} textColor={AppColors.WHITE} />
          <AppText
            title={`${date} at ${time}`}
            textSize={1.7}
            textColor={AppColors.DARKGRAY}
          />
        </View>
        <View>
          <AppText title="Stylist" textSize={2} textColor={AppColors.WHITE} />
          <AppText
            title={`${stylistName} 40 Mins`}
            textSize={1.7}
            textColor={AppColors.DARKGRAY}
          />
        </View>
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
                onPress={() => {
                  item.id === 1
                    ? ShowToast('info', 'Under Development')
                    : setPaymentType({ id: item.id });
                }}
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
                  title={item.id === 2 ? 'Total' : serviceId.serviceName}
                  textSize={item.id === 2 ? 2.2 : 1.7}
                  textColor={
                    item.title === 'Total'
                      ? AppColors.WHITE
                      : AppColors.DARKGRAY
                  }
                  textFontWeight={item.title === 'Total' ? true : false}
                />
                <AppText
                  title={`$ ${serviceId.price}`}
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
        <ConfirmationModal
          iconName={'check'}
          title={'You Appointment is confirmed!'}
          subTitle={
            'Thank you for your booking. We look forward to seeing you soon.'
          }
          buttonOneTitle={'View Receipt'}
          buttonTwoTitle={'Back to Home'}
          visible={visibleConfirmationModal}
          setVisible={() => {
            setVisibleConfirmationModal(false);
            navigation.navigate('DownloadReceipt', {
              data: bookingAppointmentResponse,
              isProductReceipt: false,
              goToHome:true,
            });
          }}
          buttonTwoHandlePress={() => {
            setVisibleConfirmationModal(false);
            navigation.navigate('Home');
          }}
        />
        <View>
          <StyleButton onPress={createBookingHandler}>
            {isLoading ? (
              <ActivityIndicator size={'large'} color={AppColors.BLACK} />
            ) : (
              'Proceed'
            )}
          </StyleButton>
        </View>

        <LineBreak space={2} />
      </View>
    </Background>
  );
};

export default BookingSummary;
