/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import Background from '../../utils/Background';
import { useNavigation } from '@react-navigation/native';
import AppHeader from '../../components/AppHeader';
import AppText from '../../components/AppTextComps/AppText';
import AppColors from '../../utils/AppColors';
import LineBreak from '../../components/LineBreak';
import StarRating from 'react-native-star-rating-widget';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import { Color } from '../../utils/Colors';
import AppTextInput from '../../components/AppTextInput';
import StyleButton from '../../components/StyleButton';

const qualityData = [
  { id: 1, title: 'Great' },
  { id: 2, title: 'Average' },
  { id: 3, title: 'Bad' },
];

const RateYourExperience = () => {
  const navigation = useNavigation();
  const [rating, setRating] = useState(0);
  const [selectedQuality, setSelectedQuality] = useState(0);

  return (
    <Background>
      <AppHeader
        onPress={() => navigation.goBack()}
        title={'Rate Your Experience'}
      />

      <LineBreak space={1} />

      <View style={{ alignItems: 'center' }}>
        <AppText
          title="Are You Satisfied With Our Service"
          textSize={2.2}
          textAlignment={'center'}
          textColor={AppColors.WHITE}
        />
        <LineBreak space={2} />
        <StarRating rating={rating} onChange={setRating} />
        <LineBreak space={2} />
        <AppText
          title="Quality"
          textSize={2.2}
          textAlignment={'center'}
          textColor={AppColors.WHITE}
        />
        <LineBreak space={2} />
        <FlatList
          data={qualityData}
          horizontal
          contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor:
                  selectedQuality === index ? AppColors.WHITE : Color('gold'),
                backgroundColor:
                  selectedQuality === index
                    ? Color('gold')
                    : Color('lightTheme'),
                paddingHorizontal: responsiveWidth(8),
                paddingVertical: responsiveHeight(1),
                borderRadius: 10,
              }}
              onPress={() => setSelectedQuality(index)}
            >
              <AppText
                title={item.title}
                textSize={2.2}
                textAlignment={'center'}
                textColor={
                  selectedQuality === index ? AppColors.BLACK : AppColors.WHITE
                }
              />
            </TouchableOpacity>
          )}
        />
      </View>
      <LineBreak space={2} />
      <AppText
        title="Overall satisfaction"
        textSize={2.2}
        textColor={AppColors.WHITE}
      />
      <LineBreak space={1} />
      <AppTextInput
        inputPlaceHolder={'Write here'}
        borderWidth={1}
        containerBg={Color('lightTheme')}
        inputHeight={20}
        multiline={true}
        textAlignVertical="top"
        borderColor={Color('gold')}
      />
      <LineBreak space={2} />
      <StyleButton
        onPress={() => navigation.navigate('Home')}
      >{`Submit`}</StyleButton>
    </Background>
  );
};

export default RateYourExperience;
