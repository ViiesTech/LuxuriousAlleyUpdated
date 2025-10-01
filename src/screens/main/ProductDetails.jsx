/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import Background from '../../utils/Background';
import AppHeader from '../../components/AppHeader';
import { useNavigation } from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import APPImages from '../../assets/APPImages';
import LineBreak from '../../components/LineBreak';
import AppText from '../../components/AppTextComps/AppText';
import AppColors from '../../utils/AppColors';
import { Color } from '../../utils/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import ReviewCard from '../../components/ReviewCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StyleButton from '../../components/StyleButton';
import Counter from '../../components/Counter';

const colors = [
  { id: 1, color: '#FF0000', title: '#1231' },
  { id: 2, color: '#9482FF', title: '#1231' },
  { id: 3, color: '#00FFD1', title: '#1231' },
  { id: 4, color: '#ADFF00', title: '#1231' },
];

const sizes = [
  { id: 1, size: 'Small' },
  { id: 2, size: 'Medium' },
  { id: 3, size: 'Large' },
];

const reviewData = [
  {
    id: 1,
    profImage: APPImages.NAILS,
    name: 'James Adrew',
    date: '1 day ago',
    rating: '5.0',
    desc: 'Many thanks to james he is professional, Cleaner..',
  },
  {
    id: 2,
    profImage: APPImages.NAILS,
    name: 'James Adrew',
    date: '1 day ago',
    rating: '5.0',
    desc: 'Many thanks to james he is professional, Cleaner..',
  },
  {
    id: 3,
    profImage: APPImages.NAILS,
    name: 'James Adrew',
    date: '1 day ago',
    rating: '5.0',
    desc: 'Many thanks to james he is professional, Cleaner..',
  },
  {
    id: 4,
    profImage: APPImages.NAILS,
    name: 'James Adrew',
    date: '1 day ago',
    rating: '5.0',
    desc: 'Many thanks to james he is professional, Cleaner..',
  },
];

const ProductDetails = () => {
  const navigation = useNavigation();
  const [selectedSize, setSelectedSize] = useState(0);

  return (
    <Background>
      <AppHeader onPress={() => navigation.goBack()} />

      <View
        style={{
          marginVertical: responsiveHeight(2),
        }}
      >
        <Image
          source={APPImages.product}
          style={{
            width: responsiveWidth(90),
            height: responsiveHeight(30),
            borderRadius: 15,
          }}
        />
        <LineBreak space={3} />
        <AppText
          title="Deep Mask Conditioner"
          textSize={2.5}
          textFontWeight
          textColor={AppColors.WHITE}
        />
        <LineBreak space={1} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              gap: responsiveWidth(2),
              alignItems: 'center',
            }}
          >
            <AppText
              title="$25.00"
              textSize={2.5}
              textColor={AppColors.WHITE}
            />
            <AppText
              title="(34 available)"
              textSize={1.6}
              textColor={AppColors.DARKGRAY}
            />
          </View>

          <Counter />
        </View>
        <LineBreak space={2} />
        <View
          style={{
            flexDirection: 'row',
            gap: responsiveWidth(3),
            alignItems: 'center',
          }}
        >
          {[...Array(5)].map((_, index) => (
            <FontAwesome
              key={index}
              name="star"
              size={responsiveFontSize(2.5)}
              color={Color('gold')}
            />
          ))}
        </View>
        <LineBreak space={2} />
        <View style={{ flexDirection: 'row', gap: responsiveWidth(4) }}>
          <AppText
            title="Color"
            textSize={2.5}
            textFontWeight
            textColor={AppColors.WHITE}
          />

          <FlatList
            data={colors}
            horizontal
            contentContainerStyle={{ gap: responsiveWidth(3) }}
            renderItem={({ item }) => (
              <View style={{ alignItems: 'center' }}>
                <View
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 100,
                    backgroundColor: item.color,
                  }}
                />
                <LineBreak space={0.5} />
                <AppText
                  title={item.title}
                  textSize={1.2}
                  textColor={AppColors.WHITE}
                />
              </View>
            )}
          />
        </View>

        <View>
          <AppText
            title="Size"
            textSize={2.5}
            textFontWeight
            textColor={AppColors.WHITE}
          />

          <LineBreak space={1} />

          <FlatList
            data={sizes}
            horizontal
            contentContainerStyle={{ gap: responsiveWidth(2) }}
            renderItem={({ item, index }) => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: responsiveWidth(2),
                }}
              >
                <TouchableOpacity onPress={() => setSelectedSize(index)}>
                  <Fontisto
                    name={
                      selectedSize == index
                        ? 'radio-btn-active'
                        : 'radio-btn-passive'
                    }
                    size={responsiveFontSize(2.7)}
                    color={Color('gold')}
                  />
                </TouchableOpacity>
                <AppText
                  title={item.size}
                  textSize={1.8}
                  textColor={AppColors.WHITE}
                />
              </View>
            )}
          />
        </View>

        <LineBreak space={2} />

        <View>
          <AppText
            title="Description"
            textSize={2.5}
            textFontWeight
            textColor={AppColors.WHITE}
          />

          <AppText
            title="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard"
            textSize={1.9}
            textColor={AppColors.DARKGRAY}
          />
        </View>

        <LineBreak space={2} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
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
                title="4.9 (124)"
                textSize={2.2}
                textColor={AppColors.WHITE}
              />
            </View>
          </View>
        </View>

        <LineBreak space={2} />
        <FlatList
          data={reviewData}
          contentContainerStyle={{ gap: 10 }}
          horizontal
          renderItem={({ item }) => (
            <ReviewCard
              day={item.date}
              image={item.profImage}
              name={item.name}
              rating={item.rating}
              desc={item.desc}
            />
          )}
        />
        <LineBreak space={2} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={[styles.btnContainer, { width: 50, height: 50 }]}
            onPress={() => navigation.navigate('ChatMessages')}
          >
            <Ionicons
              name={'chatbox-outline'}
              size={responsiveFontSize(3)}
              color={AppColors.WHITE}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.btnContainer,
              { width: responsiveWidth(35), height: 50, borderRadius: 100 },
            ]}
          >
            <AppText
              title="Add to Cart"
              textSize={2.3}
              textColor={AppColors.WHITE}
            />
          </TouchableOpacity>

          <StyleButton
            btnWidth={responsiveWidth(35)}
            justifyContent={'center'}
            fontSize={2.3}
            color={AppColors.BLACK}
            background={APPImages.buy_now}
            btnHeight={responsiveHeight(6)}
            onPress={() => navigation.navigate('Cart')}
          >{`Buy Now`}</StyleButton>
        </View>

        <LineBreak space={2} />
      </View>
    </Background>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  btnContainer: {
    borderWidth: 1,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: Color('gold'),
    backgroundColor: Color('lightTheme'),
  },
});
