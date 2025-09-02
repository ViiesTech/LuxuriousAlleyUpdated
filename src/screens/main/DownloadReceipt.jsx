/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import AppColors from '../../utils/AppColors';
import AppHeader from '../../components/AppHeader';
import { useNavigation } from '@react-navigation/native';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import AppText from '../../components/AppTextComps/AppText';
import LineBreak from '../../components/LineBreak';
import AppButton from '../../components/AppButton';
import Background from '../../utils/Background';
import { Color } from '../../utils/Colors';
import StyleButton from '../../components/StyleButton';

const sectionDataOne = [
  { id: 1, title: 'Salon', subTitle: 'Nails' },
  { id: 2, title: 'Customer Name', subTitle: 'John Doe' },
  { id: 3, title: 'Phone', subTitle: '+1 123 456 789' },
  { id: 4, title: 'Booking Date', subTitle: 'September 10, 2024' },
  { id: 5, title: 'Booking Time', subTitle: '9:30 AM' },
  { id: 6, title: 'Stlyist', subTitle: 'Any' },
];

const sectionDataTwo = [
  { id: 1, title: 'Dip Powder Nails', subTitle: '$10.00' },
  { id: 2, title: 'Dip Powder Nails', subTitle: '$5.00' },
  { id: 3, title: 'Discount', subTitle: '$3.00' },
];

const DownloadReceipt = () => {
  const navigation = useNavigation();

  return (
    <Background>
      <AppHeader onPress={() => navigation.goBack()} title="Receipt" />

      <View>
        <View
          style={{
            backgroundColor: Color('lightTheme'),
            borderRadius: 15,
            borderWidth: 1,
            borderColor: Color('gold'),
            paddingVertical: responsiveHeight(2),
            paddingHorizontal: responsiveWidth(4),
          }}
        >
          <FlatList
            data={sectionDataOne}
            ItemSeparatorComponent={() => <LineBreak space={1.5} />}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <AppText
                    title={item.title}
                    textSize={2}
                    textColor={Color('gold')}
                  />
                  <AppText
                    title={item.subTitle}
                    textSize={2}
                    textColor={AppColors.WHITE}
                  />
                </View>
              );
            }}
          />
        </View>

        <LineBreak space={2} />

        <View
          style={{
            backgroundColor: Color('lightTheme'),
            borderRadius: 15,
            borderWidth: 1,
            borderColor: Color('gold'),
            paddingVertical: responsiveHeight(2),
            paddingHorizontal: responsiveWidth(4),
          }}
        >
          <FlatList
            data={sectionDataTwo}
            ItemSeparatorComponent={() => <LineBreak space={1.5} />}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <AppText
                    title={item.title}
                    textSize={2}
                    textColor={Color('gold')}
                  />
                  <AppText
                    title={item.subTitle}
                    textSize={2}
                    textColor={AppColors.WHITE}
                  />
                </View>
              );
            }}
          />
        </View>
      </View>

      <LineBreak space={2} />

      <View>
        <StyleButton onPress={() => navigation.navigate('Home')}>
          Download Receipt
        </StyleButton>
      </View>

      <LineBreak space={2} />
    </Background>
  );
};

export default DownloadReceipt;
