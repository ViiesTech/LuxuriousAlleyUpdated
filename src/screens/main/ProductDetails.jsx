/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Image, TouchableOpacity, FlatList } from 'react-native';
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

const colors = [
  { id: 1, color: '#FF0000', title: '#1231' },
  { id: 2, color: '#9482FF', title: '#1231' },
  { id: 3, color: '#00FFD1', title: '#1231' },
  { id: 4, color: '#ADFF00', title: '#1231' },
];

const ProductDetails = () => {
  const navigation = useNavigation();
  const [count, setCount] = useState(0);

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

          <View
            style={{
              flexDirection: 'row',
              gap: responsiveWidth(4),
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              style={{
                borderWidth: 1,
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                borderColor: Color('gold'),
                backgroundColor: Color('lightTheme'),
              }}
              onPress={() => setCount(count - 1)}
            >
              <AntDesign
                name={'minus'}
                size={responsiveFontSize(2)}
                color={Color('gold')}
              />
            </TouchableOpacity>
            <AppText title={count} textSize={2.2} textColor={AppColors.WHITE} />
            <TouchableOpacity
              style={{
                borderWidth: 1,
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                borderColor: Color('gold'),
                backgroundColor: Color('lightTheme'),
              }}
              onPress={() => setCount(count + 1)}
            >
              <AntDesign
                name={'plus'}
                size={responsiveFontSize(2)}
                color={Color('gold')}
              />
            </TouchableOpacity>
          </View>
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
      </View>
    </Background>
  );
};

export default ProductDetails;
