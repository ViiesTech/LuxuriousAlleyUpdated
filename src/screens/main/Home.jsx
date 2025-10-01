/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
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
import SaloonsArray from '../../utils/SaloonsArray';
import { useNavigation } from '@react-navigation/native';
import { Color } from '../../utils/Colors';
import Background from '../../utils/Background';
import LineBreak from '../../components/LineBreak';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProductCard from '../../components/ProductCard';

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
  const Servies = [
    { id: 1, name: 'Dip Powder Nails', icon: APPImages.COMB },
    { id: 2, name: 'Gel Manicure/Pedicure', icon: APPImages.FACIAL },
  ];
  const navigation = useNavigation();

  return (
    <Background>
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
          onPress={() => navigation.navigate('SearchLocation')}
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
              title="Lakewood, California"
              textSize={2}
              textFontWeight
              textColor={AppColors.WHITE}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: AppColors.WHITE,
            paddingHorizontal: responsiveWidth(2.5),
            paddingVertical: responsiveHeight(1),
            borderRadius: 10,
          }}
        >
          <Ionicons
            name={'notifications-outline'}
            size={responsiveFontSize(3)}
            color={Color('gold')}
          />
        </TouchableOpacity>
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

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FlatList
            data={Servies}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 10 }}
            renderItem={({ item, index }) => {
              const logic = serviceSelected == index;
              return (
                <TouchableOpacity
                  onPress={() => setServiceSelect(index)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10,
                    backgroundColor: logic ? Color('gold') : Color('cardColor'),
                    borderWidth: 1,
                    borderColor: logic ? Color('gold') : AppColors.WHITE,
                    borderRadius: 10,
                    gap: 5,
                  }}
                >
                  <Image
                    source={item.icon}
                    style={{ height: 20, width: 20, resizeMode: 'contain' }}
                  />
                  <AppText
                    title={item.name}
                    textSize={2}
                    textColor={logic ? AppColors.WHITE : Color('gold')}
                  />
                </TouchableOpacity>
              );
            }}
          />
        </View>
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
          <TouchableOpacity onPress={() => navigation.navigate('MapView')}>
            <AppText
              title="View on Map"
              textColor={Color('gold')}
              textSize={2}
            />
          </TouchableOpacity>
        </View>
      </View>

      <LineBreak space={2} />

      <FlatList
        data={SaloonsArray}
        ItemSeparatorComponent={<LineBreak space={2} />}
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

      <LineBreak space={1} />

      <View
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

        <TouchableOpacity onPress={() => navigation.navigate('MapView')}>
          <AppText title="See All" textColor={Color('gold')} textSize={2} />
        </TouchableOpacity>
      </View>

      <LineBreak space={2} />

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
      />

      <LineBreak space={1} />

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

        <TouchableOpacity onPress={() => navigation.navigate('MapView')}>
          <AppText title="See All" textColor={Color('gold')} textSize={2} />
        </TouchableOpacity>
      </View>

      <LineBreak space={2} />

      <FlatList
        data={product}
        horizontal
        contentContainerStyle={{ gap: responsiveWidth(5) }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            onCardPress={() => navigation.navigate('ProductDetails')}
          />
        )}
      />

      <LineBreak space={3} />
    </Background>
  );
};

export default Home;
