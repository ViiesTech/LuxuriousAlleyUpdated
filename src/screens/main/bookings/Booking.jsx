/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Image } from 'react-native';
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
import CancelBookingModal from '../../../components/CancelBookingModal';
import BookingCanceledModal from '../../../components/BookingCanceledModal';
import Background from '../../../utils/Background';
import { Color } from '../../../utils/Colors';
import StyleButton from '../../../components/StyleButton';
import {
  cancelBookingByUser,
  getAllBookingsByUserId,
  getAllProductsOrdersByStatus,
  ShowToast,
} from '../../../GlobalFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { ImageBaseUrl } from '../../../assets/Utils/BaseUrl';
import moment from 'moment';
import { ProductsLoader, ReviewsLoader } from '../../../components/Loaders';
import {
  fetchBookingsByUserId,
  fetchProductOrdersByStatus,
} from '../../../redux/DataSlice';

const mainTabs = [
  { id: 1, title: 'Bookings' },
  { id: 2, title: 'Products' },
];

const bookingSubTabs = [
  { id: 1, title: 'Accepted', value: 'Accepted' },
  { id: 2, title: 'Completed', value: 'Completed' },
  { id: 3, title: 'Canceled', value: 'Canceled' },
];

const productSubTabs = [
  { id: 1, title: 'Pending', value: 'Pending' },
  { id: 2, title: 'Accepted', value: 'Accepted' },
  { id: 3, title: 'Completed', value: 'Delivered' },
];

const Booking = () => {
  const navigation = useNavigation();
  const [selectedTopTab, setSelectedTopTab] = useState({
    id: 1,
    title: 'Bookings',
  });
  const [selectedBookingSubTabs, setSelectedBookingSubTabs] = useState({
    id: 1,
    title: 'Accepted',
    value: 'Accepted',
  });
  const [selectedProductSubTabs, setSelectedProductSubTabs] = useState({
    id: 1,
    title: 'Pending',
    value: 'Pending',
  });
  const [showCancelBookingModal, setShowCancelBookingModal] = useState(false);
  const [cancelBookingId, setCancelBookingId] = useState(null);
  const { _id } = useSelector(state => state?.user?.userData);
  console.log('selectedBookingSubTabs', selectedBookingSubTabs.value);
  console.log('selectedProductSubTabs', selectedProductSubTabs);
  // const [isLoading, setIsLoading] = useState(false);
  // const [productsLoading, setProductsLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [appointmentsData, setAppointmentsData] = useState();
  const [productsData, setProductsData] = useState();
  const dispatch = useDispatch();
  const { bookingsByUser, productOrders, loading } = useSelector(
    state => state.data,
  );
  const isLoading = loading?.bookingsByUser;
  const productsLoading = loading?.productOrders;
  const acceptedBookings = bookingsByUser?.[`${_id}_Accepted`]?.data || [];
  const canceledBookings = bookingsByUser?.[`${_id}_Canceled`]?.data || [];
  const completedBookings = bookingsByUser?.[`${_id}_Completed`]?.data || [];

  console.log('productOrders', productOrders);
  const [showSuccessCancelBookingModal, setShowSuccessCancelBookingModal] =
    useState(false);

  useEffect(() => {
    const key = `${_id}_${selectedBookingSubTabs.value}`;
    const existingData = bookingsByUser?.[key]?.data;

    dispatch(
      fetchBookingsByUserId({
        userId: _id,
        status: selectedBookingSubTabs.value,
        silent: !!existingData, // true if cached data exists
      }),
    );
  }, [selectedBookingSubTabs?.value]);

  // const getAllAppointmentsHandler = async () => {
  //   setIsLoading(true);
  //   console.log(_id, selectedBookingSubTabs.value);
  //   try {
  //     const response = await getAllBookingsByUserId(
  //       _id,
  //       selectedBookingSubTabs.value,
  //     );
  //     setIsLoading(false);
  //     setAppointmentsData(response?.data);

  //     // console.log('responseee.data', response?.data);
  //   } catch (error) {
  //     setIsLoading(false);
  //   }
  // };

  // const getAllProductHandler = async () => {
  //   setProductsLoading(true);
  //   try {
  //     const response = await getAllProductsOrdersByStatus(
  //       _id,
  //       selectedProductSubTabs.value,
  //     );
  //     setProductsLoading(false);

  //     setProductsData(response?.data);
  //     console.log('ressponsedata', response);
  //   } catch (error) {
  //     setProductsLoading(false);

  //     console.log('errrror', error);

  //     ShowToast('error', error?.response?.data?.message);
  //   }
  // };

  const handleCancelBooking = async () => {
    setCancelLoading(true);
    try {
      const response = await cancelBookingByUser(cancelBookingId);
      if (response?.success) {
        setShowCancelBookingModal(false);
        setShowSuccessCancelBookingModal(true);

        // 🧹 Invalidate cache for both current and canceled statuses
        dispatch({
          type: 'data/clearBookingsCacheForStatus',
          payload: `${_id}_${selectedBookingSubTabs.value}`,
        });
        dispatch({
          type: 'data/clearBookingsCacheForStatus',
          payload: `${_id}_Canceled`,
        });

        // 🔄 Re-fetch both if needed (current + canceled)
        dispatch(
          fetchBookingsByUserId({
            userId: _id,
            status: selectedBookingSubTabs.value,
          }),
        );
        dispatch(
          fetchBookingsByUserId({
            userId: _id,
            status: 'Canceled',
            silent: true, // background refresh
          }),
        );

        // ShowToast('success', 'Booking cancelled successfully!');
      } else {
        ShowToast('error', response?.message);
      }
    } catch (error) {
      ShowToast(
        'error',
        error?.response?.data?.message || 'Something went wrong',
      );
    } finally {
      setCancelLoading(false);
    }
  };

  // useEffect(() => {
  //   getAllAppointmentsHandler();
  // }, [selectedBookingSubTabs?.value]);

  useEffect(() => {
    const key = `${_id}_${selectedProductSubTabs.value}`;
    const existingData = productOrders?.[key]?.data;
    if (selectedTopTab.id === 2) {
      if (!existingData || existingData.length === 0) {
        // Normal fetch with loader
        dispatch(
          fetchProductOrdersByStatus({
            userId: _id,
            status: selectedProductSubTabs.value,
          }),
        );
      } else {
        // Silent refresh (no loader)
        dispatch(
          fetchProductOrdersByStatus({
            userId: _id,
            status: selectedProductSubTabs.value,
            silent: true,
          }),
        );
      }
    } else {
      return;
    }
  }, [selectedProductSubTabs?.value, selectedTopTab?.id]);

  const ordersKey = `${_id}_${selectedProductSubTabs.value}`;
  const currentOrders = productOrders?.[ordersKey]?.data || [];
  return (
    <Background contentContainerStyle={{ paddingBottom: responsiveHeight(2) }}>
      <AppHeader onPress={() => navigation.goBack()} title="Shop & Book" />

      <CancelBookingModal
        visible={showCancelBookingModal}
        isCancelLoading={cancelLoading}
        handleAppointmentButtonPress={() => {
          setShowCancelBookingModal(false);
          // setShowSuccessCancelBookingModal(true);
        }}
        handleCancelButtonPress={() => {
          handleCancelBooking();
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
                onPress={() =>
                  setSelectedTopTab({ id: item.id, title: item?.title })
                }
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

      <View style={{}}>
        {selectedTopTab.id === 1 ? (
          <FlatList
            data={bookingSubTabs}
            horizontal
            contentContainerStyle={{
              flex: 1,
              justifyContent: 'center',
              gap: responsiveWidth(10),
              alignItems: 'center',
            }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    setSelectedBookingSubTabs({
                      id: item.id,
                      title: item?.title,
                      value: item?.value,
                    })
                  }
                >
                  <AppText
                    title={item.title}
                    textSize={2.4}
                    textColor={
                      selectedBookingSubTabs.id === item.id
                        ? Color('gold')
                        : AppColors.DARKGRAY
                    }
                    borderBottomWidth={
                      selectedBookingSubTabs.id === item.id ? 3 : 0
                    }
                    borderBottomColor={
                      selectedBookingSubTabs.id === item.id
                        ? Color('gold')
                        : null
                    }
                    paddingBottom={responsiveHeight(0.5)}
                  />
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <FlatList
            data={productSubTabs}
            horizontal
            contentContainerStyle={{
              flex: 1,
              justifyContent: 'center',
              gap: responsiveWidth(10),
              alignItems: 'center',
            }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    setSelectedProductSubTabs({
                      id: item.id,
                      title: item?.title,
                      value: item?.value,
                    })
                  }
                >
                  <AppText
                    title={item.title}
                    textSize={2.4}
                    textColor={
                      selectedProductSubTabs.id === item.id
                        ? Color('gold')
                        : AppColors.DARKGRAY
                    }
                    borderBottomWidth={
                      selectedProductSubTabs.id === item.id ? 3 : 0
                    }
                    borderBottomColor={
                      selectedProductSubTabs.id === item.id
                        ? Color('gold')
                        : null
                    }
                    paddingBottom={responsiveHeight(0.5)}
                  />
                </TouchableOpacity>
              );
            }}
          />
        )}

        <LineBreak space={2} />

        {selectedTopTab.id === 1 && (
          <>
            {/* UPCOMING / ACCEPTED BOOKINGS */}
            {selectedBookingSubTabs.id === 1 &&
              (isLoading ? (
                <ReviewsLoader isHorizontal={false} height={24} width={90} />
              ) : acceptedBookings?.length > 0 ? (
                <FlatList
                  data={acceptedBookings}
                  keyExtractor={item => item._id}
                  ItemSeparatorComponent={<LineBreak space={2} />}
                  renderItem={({ item }) => (
                    <BookingCard
                      disabled
                      item={item}
                      title={item.salonId?.bName}
                      img={{ uri: `${ImageBaseUrl}${item.salonId?.bImage}` }}
                      location={item?.salonId?.bLocationName}
                      date={`${moment(item?.date, 'DD-MM-YYYY').format(
                        'MMMM D, YYYY',
                      )} - ${item.time}`}
                      service={item.serviceId?.serviceName}
                      bookingType="up_coming"
                      cancelBookingOnPress={() => {
                        setCancelBookingId(item?._id);
                        setShowCancelBookingModal(true);
                      }}
                    />
                  )}
                />
              ) : (
                <View
                  style={{
                    height: responsiveHeight(30),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <AppText
                    title="No Bookings Found"
                    textSize={2.8}
                    textColor={AppColors.WHITE}
                  />
                </View>
              ))}

            {/* COMPLETED BOOKINGS */}
            {selectedBookingSubTabs.id === 2 &&
              (isLoading ? (
                <ReviewsLoader isHorizontal={false} height={24} width={90} />
              ) : completedBookings?.length > 0 ? (
                <FlatList
                  data={completedBookings}
                  keyExtractor={item => item._id}
                  ItemSeparatorComponent={<LineBreak space={2} />}
                  renderItem={({ item }) => (
                    <BookingCard
                      ratingToSalon={true}
                      item={item}
                      disabled
                      title={item.salonId?.bName}
                      img={{ uri: `${ImageBaseUrl}${item.salonId?.bImage}` }}
                      location={item?.salonId?.bLocationName}
                      date={`${moment(item?.date, 'DD-MM-YYYY').format(
                        'MMMM D, YYYY',
                      )} - ${item.time}`}
                      showBtnSideBySide={true}
                      service={item.serviceId?.serviceName}
                      bookingType="completed"
                    />
                  )}
                />
              ) : (
                <View
                  style={{
                    height: responsiveHeight(30),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <AppText
                    title="No Bookings Found"
                    textSize={2.8}
                    textColor={AppColors.WHITE}
                  />
                </View>
              ))}

            {/* CANCELED BOOKINGS */}
            {selectedBookingSubTabs.id === 3 &&
              (isLoading ? (
                <ReviewsLoader isHorizontal={false} height={24} width={90} />
              ) : canceledBookings?.length > 0 ? (
                <FlatList
                  data={canceledBookings}
                  keyExtractor={item => item._id}
                  ItemSeparatorComponent={<LineBreak space={2} />}
                  renderItem={({ item }) => (
                    <BookingCard
                      disabled
                      title={item.salonId?.bName}
                      img={{ uri: `${ImageBaseUrl}${item.salonId?.bImage}` }}
                      location={item?.salonId?.bLocationName}
                      date={`${moment(item?.date, 'DD-MM-YYYY').format(
                        'MMMM D, YYYY',
                      )} - ${item.time}`}
                      service={item.serviceId?.serviceName}
                      bookingType="canceled"
                    />
                  )}
                />
              ) : (
                <View
                  style={{
                    height: responsiveHeight(30),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <AppText
                    title="No Bookings Found"
                    textSize={2.8}
                    textColor={AppColors.WHITE}
                  />
                </View>
              ))}
          </>
        )}
        {/* {selectedBookingSubTabs.id === 1 &&
          selectedTopTab.id === 1 &&
          (isLoading ? (
            <View>
              <ReviewsLoader isHorizontal={false} height={24} width={90} />
            </View>
          ) : (
            <FlatList
              data={bookingsByUser}
              ItemSeparatorComponent={<LineBreak space={2} />}
              renderItem={({ item }) => {
                return (
                  <BookingCard
                    disabled
                    item={item}
                    title={item.salonId?.bName}
                    img={{ uri: `${ImageBaseUrl}${item.salonId?.bImage}` }}
                    location={item?.salonId?.bLocationName}
                    date={`${moment(item?.date, 'DD-MM-YYYY').format(
                      'MMMM D, YYYY',
                    )} - ${item.time}`}
                    service={item.serviceId?.serviceName}
                    bookingType="up_coming"
                    cancelBookingOnPress={() => {
                      setCancelBookingId(item?._id);
                      setShowCancelBookingModal(true);
                    }}
                  />
                );
              }}
            />
          ))}
        {selectedBookingSubTabs.id === 2 &&
          selectedTopTab.id === 1 &&
          (isLoading ? (
            <View>
              <ReviewsLoader isHorizontal={false} height={24} width={90} />
            </View>
          ) : (
            <FlatList
              data={bookingsByUser}
              ItemSeparatorComponent={<LineBreak space={2} />}
              renderItem={({ item }) => {
                return (
                  <BookingCard
                    ratingToSalon={true}
                    item={item}
                    disabled
                    title={item.salonId?.bName}
                    img={{ uri: `${ImageBaseUrl}${item.salonId?.bImage}` }}
                    location={item?.salonId?.bLocationName}
                    date={`${moment(item?.date, 'DD-MM-YYYY').format(
                      'MMMM D, YYYY',
                    )} - ${item.time}`}
                    showBtnSideBySide={true}
                    service={item.serviceId?.serviceName}
                    // bookingType="up_coming"
                    bookingType="completed"
                    cancelBookingOnPress={() => setShowCancelBookingModal(true)}
                  />
                );
              }}
            />
          ))}
        {selectedBookingSubTabs.id === 3 &&
          selectedTopTab.id === 1 &&
          (isLoading ? (
            <View>
              <ReviewsLoader isHorizontal={false} height={24} width={90} />
            </View>
          ) : (
            <FlatList
              data={bookingsByUser}
              ItemSeparatorComponent={<LineBreak space={2} />}
              renderItem={({ item }) => {
                return (
                  <BookingCard
                    disabled
                    title={item.salonId?.bName}
                    img={{ uri: `${ImageBaseUrl}${item.salonId?.bImage}` }}
                    location={item?.salonId?.bLocationName}
                    date={`${moment(item?.date, 'DD-MM-YYYY').format(
                      'MMMM D, YYYY',
                    )} - ${item.time}`}
                    service={item.serviceId?.serviceName}
                    bookingType={'canceled'}
                  />
                );
              }}
            />
          ))} */}
        {selectedTopTab.id === 2 && (
          <>
            {/* ✅ For Pending & Accepted */}
            {(selectedProductSubTabs.id === 1 ||
              selectedProductSubTabs.id === 2) &&
              (productsLoading ? (
                <FlatList
                  contentContainerStyle={{ gap: responsiveHeight(2) }}
                  columnWrapperStyle={{
                    gap: responsiveHeight(2),
                    justifyContent: 'space-between',
                  }}
                  numColumns={2}
                  data={[1, 2, 3, 4, 5, 6]}
                  renderItem={() => <ProductsLoader height={30} width={43} />}
                />
              ) : currentOrders?.length > 0 ? (
                <FlatList
                  data={currentOrders}
                  numColumns={2}
                  keyExtractor={item => item._id.toString()}
                  columnWrapperStyle={{ justifyContent: 'space-between' }}
                  contentContainerStyle={{ gap: responsiveHeight(2) }}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() =>
                        navigation?.navigate('OrderDetails', { data: item })
                      }
                      style={{
                        flex: 1,
                        margin: 8,
                        borderWidth: 1,
                        borderColor: '#C68519',
                        backgroundColor: '#312D6F',
                        borderRadius: 10,
                        padding: 10,
                        maxWidth: '48%',
                      }}
                    >
                      <Image
                        style={{
                          height: responsiveHeight(13),
                          width: '100%',
                          borderRadius: responsiveHeight(1),
                        }}
                        source={{
                          uri: `${ImageBaseUrl}${item?.salonId?.bImage}`,
                        }}
                      />
                      <LineBreak space={2} />
                      <AppText
                        textSize={2.2}
                        numberOfLines={1}
                        textFontWeight
                        title={item?.salonId?.bName}
                        textColor="white"
                      />
                      <LineBreak space={2} />
                      <AppText
                        textSize={2}
                        title={`Items: ${item.product.length}`}
                        textColor={AppColors.WHITE}
                      />
                      <AppText
                        textSize={2}
                        title={`Total: $${item.subTotal}`}
                        textColor={AppColors.WHITE}
                      />
                      <AppText
                        textSize={2}
                        title={moment(item?.date, 'DD-MM-YYYY').format(
                          'MMM/DD/YY',
                        )}
                        textColor="lightgray"
                      />
                      <LineBreak space={1} />
                      <TouchableOpacity
                        onPress={() =>
                          navigation?.navigate('OrderDetails', { data: item })
                        }
                      >
                        <AppText
                          textSize={1.7}
                          title="View Details..."
                          textColor={AppColors.themeColor}
                        />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  )}
                />
              ) : (
                <View
                  style={{
                    height: responsiveHeight(30),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <AppText
                    title="No Products Found"
                    textSize={2.8}
                    textColor={AppColors.WHITE}
                  />
                </View>
              ))}

            {/* ✅ For Completed */}
            {selectedProductSubTabs.id === 3 &&
              (productsLoading ? (
                <ReviewsLoader isHorizontal={false} height={24} width={90} />
              ) : currentOrders?.length > 0 ? (
                <FlatList
                  data={currentOrders}
                  contentContainerStyle={{ gap: responsiveHeight(2) }}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() =>
                        navigation?.navigate('OrderDetails', { data: item })
                      }
                      style={{
                        width: '100%',
                        borderWidth: 1.5,
                        borderColor: AppColors.themeColor,
                        borderRadius: responsiveHeight(1),
                        backgroundColor: '#2E2A69',
                        padding: responsiveHeight(1.5),
                      }}
                    >
                      <Image
                        style={{
                          width: '100%',
                          height: responsiveHeight(22),
                          borderRadius: responsiveHeight(1),
                          marginBottom: responsiveHeight(2),
                        }}
                        source={{
                          uri: `${ImageBaseUrl}${item?.salonId?.bImage}`,
                        }}
                      />
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: responsiveHeight(2),
                        }}
                      >
                        <AppText
                          title={moment(item?.date, 'DD-MM-YYYY').format(
                            'MMM DD, YYYY',
                          )}
                          textSize={1.8}
                          textColor={AppColors.WHITE}
                        />
                        <AppText
                          title="Completed"
                          textSize={1.8}
                          textColor="#9895B8"
                        />
                      </View>

                      <AppText
                        textFontWeight
                        title={item?.salonId?.bName}
                        textSize={2}
                        textColor={AppColors.WHITE}
                      />

                      <TouchableOpacity
                        onPress={() =>
                          navigation?.navigate('OrderDetails', { data: item })
                        }
                        style={{
                          width: responsiveWidth(30),
                          marginTop: responsiveHeight(1.5),
                        }}
                      >
                        <AppText
                          textSize={2}
                          title="View Details..."
                          textColor={AppColors.themeColor}
                        />
                      </TouchableOpacity>

                      <StyleButton
                        style={{ marginTop: responsiveHeight(2) }}
                        onPress={() =>
                          navigation.navigate('DownloadReceipt', {
                            data: item,
                            isProductReceipt: true,
                          })
                        }
                      >
                        View Receipt
                      </StyleButton>
                    </TouchableOpacity>
                  )}
                />
              ) : (
                 <View
                  style={{
                    height: responsiveHeight(30),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <AppText
                    title="No Products Found"
                    textSize={2.8}
                    textColor={AppColors.WHITE}
                  />
                </View>
              ))}
          </>
        )}
      </View>
    </Background>
  );
};

export default Booking;
