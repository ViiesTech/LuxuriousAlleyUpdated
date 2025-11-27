/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import AppText from '../../components/AppTextComps/AppText';
import AppColors from '../../utils/AppColors';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import AppTextInput from '../../components/AppTextInput';
import AntDesign from 'react-native-vector-icons/AntDesign';
import APPImages from '../../assets/APPImages';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import SaloonsCard from '../../components/SaloonsCard';
import { useNavigation } from '@react-navigation/native';
import { Color } from '../../utils/Colors';
import Background from '../../utils/Background';
import LineBreak from '../../components/LineBreak';
import {
  ProductsLoader,
  SalonLoader,
  ServiceLoader,
} from '../../components/Loaders';
import ProductCard from '../../components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { ShowToast } from '../../GlobalFunctions';
import { ImageBaseUrl } from '../../assets/Utils/BaseUrl';
import {
  fetchCategories,
  fetchNearbySalons,
  fetchProducts,
} from '../../redux/DataSlice';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const popularStylist = [
  {
    id: 1,
    image: APPImages.user,
    name: 'Jefferson Harris',
    rating: '2.6',
  },
  {
    id: 2,
    image: APPImages.user,
    name: 'Ricardo Trautman',
    rating: '2.6',
  },
  {
    id: 3,
    image: APPImages.user,
    name: 'Robert Collier',
    rating: '2.6',
  },
  {
    id: 4,
    image: APPImages.user,
    name: 'Robert Collier',
    rating: '2.6',
  },
  {
    id: 5,
    image: APPImages.user,
    name: 'Ricardo Trautman',
    rating: '2.6',
  },
];

const product = [
  { id: 1, image: APPImages.product, name: 'Deep Mask', price: '$50.00' },
  { id: 2, image: APPImages.product, name: 'Deep Mask', price: '$50.00' },
  { id: 3, image: APPImages.product, name: 'Deep Mask', price: '$50.00' },
  { id: 4, image: APPImages.product, name: 'Deep Mask', price: '$50.00' },
  { id: 5, image: APPImages.product, name: 'Deep Mask', price: '$50.00' },
];

const Home = () => {
  const [serviceSelected, setServiceSelect] = useState(0);
  const navigation = useNavigation();
  const { location } = useSelector(state => state?.user?.userData);
  const { userData } = useSelector(state => state?.user);
  const dispatch = useDispatch();
  console.log('userData', userData);
  const { categories, salons, loading, nearbySalonsCache, allProducts } =
    useSelector(state => state.data);
  console.log('nearbySalonsCache', nearbySalonsCache);
  console.log('allProducts', allProducts?.[serviceSelected]);
  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    } else {
      dispatch(fetchCategories({ silent: true }));
    }
  }, [dispatch]);

  // ✅ Set default service when categories arrive
  useEffect(() => {
    if (categories?.length > 0 && !serviceSelected) {
      setServiceSelect(categories[0]?._id);
    }
  }, [categories]);

  useEffect(() => {
    if (!serviceSelected || !location) return;

    const { coordinates } = location;
    // const lat = coordinates[0];
    // const lng = coordinates[1];
    const lat = 40.758;
    const lng = -73.9855;

    // Create cache key
    const cacheKey = `${serviceSelected}_${lat.toFixed(3)}_${lng.toFixed(3)}`;
    const cachedData = nearbySalonsCache[cacheKey];

    if (!cachedData) {
      //  No cache — show loader & call API
      dispatch(fetchNearbySalons({ lat, lng, serviceId: serviceSelected }));
    } else {
      // ✅ Use cache instantly (no loader)
      dispatch({
        type: 'data/setSalons', // update current salons from cache
        payload: cachedData,
      });

      //  Refresh in background silently
      dispatch(
        fetchNearbySalons({
          lat,
          lng,
          serviceId: serviceSelected,
          silent: true,
        }),
      );
    }
  }, [serviceSelected, location]);

  // useEffect(() => {
  //   if (!serviceSelected) return;

  //   // Optional: skip if products already loaded for this category
  //   if (allProducts.length > 0) {
  //     dispatch(fetchProducts({ categoryId: serviceSelected, silent: true }));
  //   } else {
  //     dispatch(fetchProducts({ categoryId: serviceSelected }));
  //   }
  // }, [serviceSelected]);

  useEffect(() => {
    if (!serviceSelected) return;

    const cachedProducts = allProducts?.[serviceSelected];

    if (cachedProducts && cachedProducts.length > 0) {
      // ✅ Use cache instantly, don't show loader
      dispatch({
        type: 'data/setProducts',
        payload: { categoryId: serviceSelected, data: cachedProducts },
      });

      // 🔄 Optional: refresh silently only once (not every switch)
      // You can comment this out if not needed
      dispatch(fetchProducts({ categoryId: serviceSelected, silent: true }));
    } else {
      // ❌ No cache, so fetch once
      dispatch(fetchProducts({ categoryId: serviceSelected }));
    }
  }, [serviceSelected]);
  console.log('userdata', serviceSelected);
  return (
    <Background contentContainerStyle={{ paddingTop: responsiveHeight(2) }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: 'row' }}
          // onPress={() => navigation.navigate('SearchLocation')}
          onPress={() => ShowToast('info', 'Under Development')}
        >
          <EvilIcons
            name={'location'}
            color={AppColors.WHITE}
            size={responsiveFontSize(5)}
          />
          <View>
            <AppText
              title="Location"
              textColor={AppColors.DARKGRAY}
              textSize={2}
            />
            <AppText
              numberOfLines={1}
              textwidth={50}
              title={location?.locationName}
              textSize={2}
              textFontWeight
              textColor={AppColors.WHITE}
            />
          </View>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: responsiveHeight(1.5),
          }}
        >
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: AppColors.WHITE,
              paddingHorizontal: responsiveWidth(1.8),
              paddingVertical: responsiveHeight(1),
              borderRadius: 10,
            }}
            onPress={() => navigation.navigate('ChatList')}
          >
            <Ionicons
              name={'chatbubble-ellipses-outline'}
              size={responsiveFontSize(3)}
              color={Color('gold')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: AppColors.WHITE,
              paddingHorizontal: responsiveWidth(1.8),
              paddingVertical: responsiveHeight(1),
              borderRadius: 10,
            }}
            onPress={() => navigation.navigate('Notification')}
          >
            <Ionicons
              name={'notifications-outline'}
              size={responsiveFontSize(3)}
              color={Color('gold')}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ marginTop: 20 }}>
        <AppTextInput
          containerBg={Color('lightTheme')}
          borderWidth={1}
          borderColor={Color('gold')}
          inputPlaceHolder={'Enter address or city name'}
          logo={
            <AntDesign
              name={'search1'}
              size={responsiveFontSize(2)}
              color={AppColors.WHITE}
            />
          }
        />
      </View>

      <ImageBackground
        source={APPImages.DISCOUNT}
        style={{
          width: responsiveWidth(90),
          height: responsiveHeight(20),
          borderRadius: 15,
          overflow: 'hidden',
          padding: 20,
          marginTop: 20,
        }}
      >
        <LinearGradient
          colors={[
            AppColors.WHITE,
            AppColors.BLUE,
            AppColors.BLUE,
            AppColors.BLUE,
          ]}
          end={{ x: 0, y: 1 }}
          style={{
            position: 'absolute',
            zIndex: 1,
            width: responsiveWidth(90),
            height: responsiveHeight(20),
            opacity: 0.5,
          }}
        />
        <View style={{ position: 'absolute', zIndex: 2, padding: 20 }}>
          <AppText
            title="Morning Special!"
            textSize={2}
            textFontWeight
            textColor={AppColors.WHITE}
          />
          <AppText
            title="Get 20% Off"
            textSize={3}
            textFontWeight
            textColor={AppColors.WHITE}
          />
          <AppText
            title="on All Nail Service Between 9-10 AM."
            textSize={1.5}
            textColor={AppColors.WHITE}
          />
          <TouchableOpacity
            style={{
              backgroundColor: AppColors.WHITE,
              alignSelf: 'flex-start',
              padding: 10,
              borderRadius: 10,
              marginTop: 10,
            }}
          >
            <AppText
              title="Book Now"
              textColor={AppColors.BLACK}
              textSize={2}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <View style={{ marginTop: responsiveHeight(2) }}>
        <AppText
          title="Services"
          textColor={AppColors.WHITE}
          textSize={2.5}
          textFontWeight
        />

        <LineBreak space={2} />
        {loading?.categories ? (
          <View style={{}}>
            <ServiceLoader />
          </View>
        ) : (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FlatList
              data={categories}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 10 }}
              renderItem={({ item, index }) => {
                const logic = serviceSelected === item?._id;
                return (
                  <TouchableOpacity
                    onPress={() => setServiceSelect(item?._id)}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 10,
                      backgroundColor: logic
                        ? Color('gold')
                        : Color('cardColor'),
                      borderWidth: 1,
                      borderColor: logic ? Color('gold') : AppColors.WHITE,
                      borderRadius: 10,
                      gap: 5,
                    }}
                  >
                    <Image
                      source={APPImages.COMB}
                      style={{ height: 20, width: 20, resizeMode: 'contain' }}
                    />
                    <AppText
                      title={item?.categoryName}
                      textSize={2}
                      textColor={logic ? AppColors.WHITE : Color('gold')}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        )}
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: responsiveHeight(3),
        }}
      >
        <AppText
          title="Nearby Salons"
          textColor={AppColors.WHITE}
          textSize={2.5}
          textFontWeight
        />

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <Entypo
            name={'location'}
            color={Color('gold')}
            size={responsiveFontSize(2)}
          />
          {/* <TouchableOpacity onPress={() => navigation.navigate('MapView')}> */}
          <TouchableOpacity
            onPress={() => ShowToast('info', 'Under Development')}
          >
            <AppText
              title="View on Map"
              textColor={Color('gold')}
              textSize={2}
            />
          </TouchableOpacity>
        </View>
      </View>

      <LineBreak space={2} />
      {loading?.nearBy ? (
        <SalonLoader />
      ) : salons?.length < 1 ? (
        <View style={{ marginTop: responsiveHeight(1) }}>
          <AppText
            textColor="#cd8a1b"
            textSize={2.3}
            textAlignment="center"
            title="No salons found nearby."
          />
        </View>
      ) : (
        <FlatList
          data={salons}
          ItemSeparatorComponent={<LineBreak space={2} />}
          renderItem={({ item }) => {
            console.log('item', item);
            return (
              <SaloonsCard
                title={item?.bName}
                KM={
                  item?.distanceInKm
                    ? parseFloat(item.distanceInKm.replace(' km', '')).toFixed(
                        1,
                      )
                    : '2'
                }
                // KM="2"
                itemId={item?._id}
                Rating={`{${Number(item?.avgRating)?.toFixed(2)})`}
                TotalNoOfRating={item?.totalReviews}
                img={`${ImageBaseUrl}${item.bImage}`}
                location={item?.bLocationName}
              />
            );
          }}
        />
      )}

      <LineBreak space={1} />

      {/* <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: responsiveHeight(3),
        }}
      >
        <AppText
          title="Popular Stylist"
          textColor={AppColors.WHITE}
          textSize={2.5}
          textFontWeight
        />

        <TouchableOpacity>
          <AppText title="See All" textColor={Color('gold')} textSize={2} />
        </TouchableOpacity>
      </View> */}

      {/* <LineBreak space={2} />

      <FlatList
        data={popularStylist}
        horizontal
        contentContainerStyle={{ gap: responsiveWidth(5) }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={{ alignItems: 'center' }}>
            <Image source={item.image} style={{ width: 80, height: 80 }} />
            <LineBreak space={0.5} />
            <AppText
              title={item.name}
              textColor={AppColors.DARKGRAY}
              textSize={1.8}
              textwidth={20}
              textAlignment={'center'}
            />
            <LineBreak space={0.5} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: responsiveWidth(2),
              }}
            >
              <FontAwesome
                name={'star'}
                size={responsiveFontSize(1.8)}
                color={Color('gold')}
              />
              <AppText
                title={item.rating}
                textColor={AppColors.DARKGRAY}
                textSize={1.8}
              />
            </View>
          </TouchableOpacity>
        )}
      /> */}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: responsiveHeight(3),
        }}
      >
        <AppText
          title="Products"
          textColor={AppColors.WHITE}
          textSize={2.5}
          textFontWeight
        />

        <TouchableOpacity onPress={() => navigation.navigate('AllProducts')}>
          <AppText title="See All" textColor={Color('gold')} textSize={2} />
        </TouchableOpacity>
      </View>

      <LineBreak space={2} />

      {loading?.allProducts ? (
        <View style={{ width: '100%' }}>
          <FlatList
            horizontal
            data={[1, 2]}
            contentContainerStyle={{ gap: responsiveHeight(2) }}
            renderItem={({ item, index }) => {
              return <ProductsLoader />;
            }}
          />
        </View>
      ) : (
        <FlatList
          data={allProducts?.[serviceSelected]}
          horizontal
          contentContainerStyle={{ gap: responsiveWidth(5) }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <ProductCard
              item={item}
              onCardPress={
                () =>
                  navigation.navigate('HomeDetails', {
                    id: item?.salonId?._id,
                    showProductTab: true,
                  })
                // navigation.navigate('ProductDetails', { data: item })
              }
              onCartPress={
                () =>
                  navigation.navigate('HomeDetails', {
                    id: item?.salonId?._id,
                    showProductTab: true,
                  })

                // navigation.navigate('ProductDetails', { data: item })
              }
            />
          )}
        />
      )}
      <LineBreak space={3} />
    </Background>
  );
};

export default Home;
