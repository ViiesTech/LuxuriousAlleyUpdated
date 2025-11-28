/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
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
import { addReview, ShowToast } from '../../GlobalFunctions';
import { useSelector } from 'react-redux';

const qualityData = [
  { id: 1, title: 'Great' },
  { id: 2, title: 'Average' },
  { id: 3, title: 'Bad' },
];

const RateYourExperience = ({ route }) => {
  const navigation = useNavigation();
  const [rating, setRating] = useState(1);
  const [selectedQuality, setSelectedQuality] = useState({
    id: 1,
    value: 'Great',
  });
  const { _id } = useSelector(state => state?.user?.userData);
  const { productRating, productId, salonId } = route?.params;
  const [comments, setComments] = useState();
  const [isLoading, setIsLoading] = useState(false);
  console.log('route?.params', route?.params);

  const addReviewHandler = async () => {
    setIsLoading(true);
    try {
      const response = await addReview(
        productId,
        salonId,
        _id,
        rating,
        comments,
        productRating ? false : true,
      );
      if (response?.success) {
        ShowToast('success', response?.message);
        navigation.navigate('Home');
      } else {
        ShowToast('error', response?.message);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      ShowToast('error', error?.response?.data?.message);
    }
  };
  console.log('selectedQuality', selectedQuality);
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
        <StarRating
          rating={rating}
          enableHalfStar={false}
          onChange={setRating}
        />
        {/* <LineBreak space={2} />
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
                  selectedQuality.id === item.id
                    ? AppColors.WHITE
                    : Color('gold'),
                backgroundColor:
                  selectedQuality.id === item.id
                    ? Color('gold')
                    : Color('lightTheme'),
                paddingHorizontal: responsiveWidth(8),
                paddingVertical: responsiveHeight(1),
                borderRadius: 10,
              }}
              onPress={() => {
                setSelectedQuality({ id: item.id, value: item.title });
              }}
            >
              <AppText
                title={item.title}
                textSize={2.2}
                textAlignment={'center'}
                textColor={
                  selectedQuality.id === item.id
                    ? AppColors.BLACK
                    : AppColors.WHITE
                }
              />
            </TouchableOpacity>
          )}
        /> */}
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
        onChangeText={txt => setComments(txt)}
        inputHeight={20}
        multiline={true}
        textAlignVertical="top"
        borderColor={Color('gold')}
      />
      <LineBreak space={2} />
      <StyleButton onPress={addReviewHandler}>
        {isLoading ? (
          <ActivityIndicator size={'large'} color={AppColors.BLACK} />
        ) : (
          `Submit`
        )}
      </StyleButton>
    </Background>
  );
};

export default RateYourExperience;
