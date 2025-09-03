/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { FlatList, View } from 'react-native';
import Background from '../../utils/Background';
import AppHeader from '../../components/AppHeader';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppText from '../../components/AppTextComps/AppText';
import AppColors from '../../utils/AppColors';
import {
  responsiveFontSize,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import { Color } from '../../utils/Colors';
import LineBreak from '../../components/LineBreak';
import ReviewCard from '../../components/ReviewCard';
import APPImages from '../../assets/APPImages';
import StyleButton from '../../components/StyleButton';

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

const AllReviews = () => {
  const navigation = useNavigation();
  return (
    <Background>
      <AppHeader onPress={() => navigation.goBack()} isHideFav={true} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <AppText title="Reviews" textSize={2.2} textColor={AppColors.WHITE} />

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <FontAwesome
            name={'star'}
            size={responsiveFontSize(2)}
            color={Color('gold')}
          />
          <AppText
            title="4.9 (124)"
            textSize={2.2}
            textColor={AppColors.DARKGRAY}
          />
        </View>
      </View>

      <LineBreak space={2} />
      <FlatList
        data={reviewData}
        ItemSeparatorComponent={<LineBreak space={2} />}
        renderItem={({ item }) => (
          <ReviewCard
            day={item.date}
            image={item.profImage}
            name={item.name}
            rating={item.rating}
            desc={item.desc}
            style={{ width: responsiveWidth(90) }}
          />
        )}
      />

      <LineBreak space={2} />

      <View>
        <StyleButton
          onPress={() => {}}
        >{`Add Review`}</StyleButton>
      </View>
    </Background>
  );
};

export default AllReviews;
