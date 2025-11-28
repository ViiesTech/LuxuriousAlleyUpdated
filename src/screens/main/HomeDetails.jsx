/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AppHeader from '../../components/AppHeader';
import AppColors from '../../utils/AppColors';
import { useNavigation } from '@react-navigation/native';
import APPImages from '../../assets/APPImages';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import AppText from '../../components/AppTextComps/AppText';
import LineBreak from '../../components/LineBreak';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Background from '../../utils/Background';
import { Color } from '../../utils/Colors';
import StyleButton from '../../components/StyleButton';
import ReviewCard from '../../components/ReviewCard';
import ProductCard from '../../components/ProductCard';
import { addOrRemoveFvrts, ShowToast } from '../../GlobalFunctions';
import { ImageBaseUrl } from '../../assets/Utils/BaseUrl';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSalonById, fetchSalonReviewsById } from '../../redux/DataSlice';
import { ReviewsLoader, SalonDetails } from '../../components/Loaders';
import moment from 'moment';

const menuData = [
  { id: 1, title: 'Services' },
  { id: 2, title: 'Stylists' },
  { id: 3, title: 'Products' },
];

const HomeDetails = ({ route }) => {
  const navigation = useNavigation();
  const { id, showProductTab } = route?.params;
  console.log('route.params', route.params);
  console.log('id', id);

  // Redux state
  const dispatch = useDispatch();
  const { salonsById, loading, salonReviews } = useSelector(
    state => state.data,
  );
  const { userData } = useSelector(state => state?.user);
  const { _id, favourite } = userData || {};

  // Local state
  const [menu, setMenu] = useState({ id: showProductTab ? 3 : 1 });
  const [selectedItems, setSelectedItems] = useState([]);
  const [fvrtsLoading, setFvrtsLoading] = useState(false);
  const [isSelectedProfile, setIsSelectedProfile] = useState({});
  const [selectedService, setSelectedService] = useState({
    id: null,
    price: null,
    serviceName: null,
  });
  const [selectedServicePrice, setSelectedServicePrice] = useState(null);

  // Memoize salon data from Redux
  const salonData = useMemo(() => salonsById[id] || {}, [salonsById, id]);
  const isLoading = loading?.salonReviews;
  const reviews = salonReviews?.[id] || [];
  console.log('reviews', reviews);
  console.log('isLoading', isLoading);
  console.log('selectedServicePrice', selectedServicePrice);

  useEffect(() => {
    const existingData = salonReviews?.[id];

    if (!existingData || existingData.length === 0) {
      // Normal fetch with loader
      dispatch(fetchSalonReviewsById({ salonId: id }));
    } else {
      // Silent refresh (no loader)
      dispatch(fetchSalonReviewsById({ salonId: id, silent: true }));
    }
  }, [id]);
  // Fetch if not cached
  useEffect(() => {
    const fetchData = async () => {
      if (!salonsById[id]) {
        await dispatch(fetchSalonById({ id }));
      } else {
        dispatch(fetchSalonById({ id, silent: true }));
      }
    };

    fetchData();
  }, [id, dispatch]);

  // API fallback (if needed)
  const addOrRemoveFvrtHandler = async () => {
    setFvrtsLoading(true);
    try {
      await addOrRemoveFvrts(_id, salonData?.salon?._id, dispatch);
    } catch (error) {
      console.log(error);
    } finally {
      setFvrtsLoading(false);
    }
  };

  return (
    <Background>
      <AppHeader
        // isFvrt={}
        isFvrt={favourite?.includes(salonData?.salon?._id)}
        isHeartLoading={fvrtsLoading}
        onFvrtsPress={addOrRemoveFvrtHandler}
        onPress={() => navigation.goBack()}
      />
      {!salonData?.salon && loading?.salonById ? (
        <SalonDetails />
      ) : (
        <View
          style={{
            marginVertical: responsiveHeight(2),
          }}
        >
          <Image
            source={{ uri: `${ImageBaseUrl}${salonData?.salon?.bImage}` }}
            style={{
              width: responsiveWidth(90),
              height: responsiveHeight(30),
              borderRadius: 15,
            }}
          />
          <LineBreak space={3} />
          <AppText
            title={salonData?.salon?.bName}
            textSize={2.5}
            textFontWeight
            textColor={AppColors.WHITE}
          />
          <LineBreak space={1} />

          <View style={{}}>
            <View style={{ gap: responsiveHeight(2) }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: responsiveHeight(1),
                }}
              >
                <View style={{ right: responsiveHeight(0.5) }}>
                  <EvilIcons
                    name={'location'}
                    size={responsiveFontSize(2.7)}
                    color={AppColors.DARKGRAY}
                  />
                </View>
                <AppText
                  title={salonData?.salon?.bLocationName}
                  textSize={1.6}
                  textColor={AppColors.DARKGRAY}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: responsiveHeight(2),
                }}
              >
                <View>
                  <AntDesign
                    name={'clockcircleo'}
                    size={responsiveFontSize(2)}
                    color={AppColors.DARKGRAY}
                  />
                </View>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                  {salonData?.salon?.workingDays?.map((item, index) => {
                    return (
                      <View
                        style={{
                          alignItems: 'center',
                          marginRight: responsiveHeight(3),
                        }}
                      >
                        <AppText
                          title={item?.day?.slice(0, 3)}
                          textSize={1.6}
                          textColor={AppColors.DARKGRAY}
                        />
                        <AppText
                          title={`${item?.startTime} - ${item.endTime}`}
                          textSize={1.6}
                          textColor={AppColors.DARKGRAY}
                        />
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  gap: responsiveHeight(1),
                  alignItems: 'center',
                }}
              >
                <View>
                  <FontAwesome
                    name={'star'}
                    size={responsiveFontSize(2.7)}
                    color={Color('gold')}
                  />
                </View>
                <AppText
                  title={`${Number(salonData?.salon?.avgRating)?.toFixed(1)} (${
                    salonData?.salon?.totalReviews
                  })`}
                  textSize={1.6}
                  textColor={AppColors.DARKGRAY}
                />
              </View>
            </View>
          </View>

          <LineBreak space={2} />

          <AppText
            title={salonData?.salon?.bDetails}
            textSize={1.9}
            textColor={AppColors.DARKGRAY}
          />

          <LineBreak space={3} />

          <FlatList
            data={menuData}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 15 }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => setMenu({ id: item.id })}>
                  <AppText
                    title={item.title}
                    borderBottomWidth={menu.id === item.id ? 3 : 0}
                    paddingBottom={menu.id === item.id ? 6 : 0}
                    textwidth={30}
                    textAlignment={'center'}
                    borderBottomColor={
                      menu.id === item.id ? Color('gold') : AppColors.WHITE
                    }
                    textSize={2.2}
                    textColor={
                      menu.id === item.id ? Color('gold') : AppColors.DARKGRAY
                    }
                  />
                </TouchableOpacity>
              );
            }}
          />

          {menu.id == 3 && <LineBreak space={2} />}

          {menu.id == 3 && (
            <FlatList
              data={salonData?.products}
              horizontal
              contentContainerStyle={{ gap: responsiveWidth(5) }}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <ProductCard
                  item={item}
                  onCartPress={() =>
                    navigation.navigate('ProductDetails', {
                      data: {
                        ...item,
                        salonId: {
                          _id: salonData.salon?._id,
                          bName: salonData?.salon?.bName,
                          bImage: salonData?.salon?.bImage,
                        },
                      },
                    })
                  }
                  onCardPress={() =>
                    navigation.navigate('ProductDetails', {
                      data: {
                        ...item,
                        salonId: {
                          _id: salonData.salon?._id,
                          bName: salonData?.salon?.bName,
                          bImage: salonData?.salon?.bImage,
                        },
                      },
                    })
                  }
                />
              )}
            />
          )}

          {menu.id === 2 && <LineBreak space={2} />}

          {menu.id === 2 && (
            <FlatList
              data={salonData?.stylists}
              ItemSeparatorComponent={<LineBreak space={2} />}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      setIsSelectedProfile({
                        id: item._id,
                        stylistName: item?.fullName,
                      })
                    }
                    style={{
                      flexDirection: 'row',
                      paddingLeft: responsiveWidth(3),
                      borderRadius: 10,
                      gap: responsiveWidth(5),
                      paddingVertical: responsiveHeight(1.2),
                      alignItems: 'center',
                      borderWidth: 1,
                      borderColor:
                        isSelectedProfile.id === item._id
                          ? AppColors.WHITE
                          : Color('gold'),
                      backgroundColor:
                        isSelectedProfile.id === item._id
                          ? Color('gold')
                          : Color('lightTheme'),
                    }}
                  >
                    <Image
                      source={
                        item?.image
                          ? { uri: `${ImageBaseUrl}${item?.image}` }
                          : APPImages?.userDummy2
                      }
                      style={{
                        width: responsiveWidth(15),
                        height: responsiveHeight(7),
                        borderRadius: 10,
                      }}
                    />
                    <View>
                      <AppText
                        title={item.fullName}
                        textSize={2.2}
                        textColor={
                          isSelectedProfile.id === item._id
                            ? AppColors.BLACK
                            : AppColors.WHITE
                        }
                      />

                      <AppText
                        title={item.designation}
                        textSize={1.9}
                        textColor={
                          isSelectedProfile.id === item._id
                            ? AppColors.BLACK
                            : AppColors.DARKGRAY
                        }
                      />
                    </View>
                    {/* <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'flex-end',
                    paddingHorizontal: 15,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingHorizontal: item.ratingStatus ? 10 : 0,
                      paddingVertical: item.ratingStatus ? 6 : 0,
                      borderRadius: 10,
                      alignItems: 'center',
                      backgroundColor:
                        isSelectedProfile.id === item.id
                          ? AppColors.WHITE
                          : Color('gold'),
                      gap: 10,
                    }}
                  >
                    {item.ratingStatus && (
                      <SimpleLineIcons
                        name={'badge'}
                        size={responsiveFontSize(1.8)}
                        color={AppColors.BLACK}
                      />
                    )}
                    <AppText
                      title={item.ratingStatus}
                      textSize={1.8}
                      textColor={AppColors.BLACK}
                    />
                  </View>
                </View> */}
                  </TouchableOpacity>
                );
              }}
            />
          )}
          {menu.id == 1 && <LineBreak space={2} />}

          {menu.id === 1 && (
            <FlatList
              data={salonData?.services}
              ItemSeparatorComponent={<LineBreak space={2} />}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedService({
                        id: item?._id,
                        price: item?.price,
                        serviceName: item?.serviceName,
                      });
                    }}
                    style={{
                      borderRadius: responsiveHeight(1.5),
                      backgroundColor: Color('cardColor'),
                      paddingHorizontal: responsiveWidth(4),
                      paddingVertical: responsiveHeight(2),
                      borderWidth: 1,
                      borderColor: Color('gold'),
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <View>
                        <AppText
                          title={item?.serviceName}
                          textSize={2.2}
                          textFontWeight
                          textColor={AppColors.WHITE}
                        />
                        <LineBreak space={0.5} />
                        <View style={{ flexDirection: 'row', gap: 20 }}>
                          <AppText
                            title={item?.price}
                            textSize={1.5}
                            textColor={
                              selectedItems.some(i => i.id === item.id)
                                ? AppColors.WHITE
                                : AppColors.DARKGRAY
                            }
                          />
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: 6,
                            }}
                          >
                            <AntDesign
                              name={'clockcircleo'}
                              size={responsiveFontSize(1.5)}
                              color={
                                selectedItems.some(i => i.id === item.id)
                                  ? AppColors.WHITE
                                  : AppColors.DARKGRAY
                              }
                            />
                            <AppText
                              title="30 Mins"
                              textSize={1.5}
                              textColor={
                                selectedItems.some(i => i.id === item.id)
                                  ? AppColors.WHITE
                                  : AppColors.DARKGRAY
                              }
                            />
                          </View>
                        </View>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          setSelectedService({
                            id: item?._id,
                            price: item?.price,
                            serviceName: item?.serviceName,
                          });
                        }}
                      >
                        <AntDesign
                          name={
                            selectedService.id === item?._id
                              ? 'checkcircle'
                              : 'pluscircleo'
                          }
                          size={responsiveFontSize(2.7)}
                          color={AppColors.WHITE}
                        />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          )}

          <LineBreak space={2} />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}
            >
              <AppText
                title="Reviews"
                textSize={2.2}
                textColor={AppColors.WHITE}
              />

              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
              >
                <FontAwesome
                  name={'star'}
                  size={responsiveFontSize(2)}
                  color={Color('gold')}
                />
                <AppText
                  title={`${Number(salonData?.salon?.avgRating)?.toFixed(1)} (${
                    salonData?.salon?.totalReviews
                  })`}
                  textSize={2.2}
                  textColor={AppColors.WHITE}
                />
              </View>
            </View>
            {reviews?.length < 1 ? null : (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('AllReviews', { salonId: id })
                }
              >
                <AppText
                  title="See All"
                  textSize={2.2}
                  textColor={Color('gold')}
                  borderBottomColor={Color('gold')}
                  borderBottomWidth={1}
                />
              </TouchableOpacity>
            )}
          </View>

          <LineBreak space={2} />
          {isLoading ? (
            <View>
              <ReviewsLoader />
            </View>
          ) : reviews?.length < 1 ? (
            <View style={{ marginVertical: responsiveHeight(2) }}>
              <AppText
                textAlignment="center"
                textColor={AppColors.WHITE}
                textSize={2.5}
                title="No Reviews Found"
              />
            </View>
          ) : (
            <FlatList
              data={reviews?.slice(0, 3)}
              contentContainerStyle={{ gap: 10 }}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <ReviewCard
                  day={moment(item.createdAt).fromNow()}
                  image={{ uri: `${ImageBaseUrl}${item?.userId?.image}` }}
                  name={item?.userId?.username}
                  rating={item?.stars}
                  desc={item?.message}
                />
              )}
            />
          )}

          <LineBreak space={2} />
          {menu.id === 3 ? null : (
            <View>
              <StyleButton
                onPress={() => {
                  if (menu.id === 1) {
                    if (!selectedService?.id) {
                      return ShowToast('error', 'Plz Choose A Service');
                    }
                    navigation.navigate('StylistSelect', {
                      stylistId: undefined,
                      serviceId: selectedService,
                      servicePrice: selectedServicePrice,
                      salonId: salonData.salon,
                    });
                  } else if (menu.id === 2) {
                    if (!isSelectedProfile?.id) {
                      return ShowToast('error', 'Plz Choose A Stylist');
                    }
                    navigation.navigate('ChooseServices', {
                      stylistId: isSelectedProfile.id,
                      stylistName: isSelectedProfile?.stylistName,
                      salonId: salonData.salon,
                    });
                  }
                }}
              >
                Continue
              </StyleButton>
            </View>
          )}
        </View>
      )}
    </Background>
  );
};

export default HomeDetails;
