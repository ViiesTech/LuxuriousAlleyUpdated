/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import Background from '../../utils/Background';
import AppHeader from '../../components/AppHeader';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppText from '../../components/AppTextComps/AppText';
import AppColors from '../../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import { Color } from '../../utils/Colors';
import LineBreak from '../../components/LineBreak';
import ReviewCard from '../../components/ReviewCard';
import APPImages from '../../assets/APPImages';
import StyleButton from '../../components/StyleButton';
import { getReviewsBySalonId } from '../../GlobalFunctions';
import moment from 'moment';
import { ImageBaseUrl } from '../../assets/Utils/BaseUrl';
import { ReviewsLoader } from '../../components/Loaders';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSalonReviewsById } from '../../redux/DataSlice';

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

const AllReviews = ({ route }) => {
  const navigation = useNavigation();
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewsData, setReviewsData] = useState([]);
  const [reviewDetails, setReviewDetails] = useState({
    avgRating: 0,
    totalRatings: 0,
  });
  const { salonId } = route?.params;
  const { loading, salonReviews } = useSelector(state => state.data);
  const isLoading = loading?.salonReviews;
  const reviews = salonReviews?.[salonId] || [];
  const dispatch = useDispatch();
  console.log('reviewDetails', reviewDetails);
  const fetchSalonReviewsHandler = async () => {
    setReviewsLoading(true);
    try {
      const response = await getReviewsBySalonId(salonId);
      console.log('resssponse', response);
      setReviewsLoading(false);
      setReviewsData(response?.data);
      setReviewDetails({
        avgRating: response?.averageRating,
        totalRatings: response?.totalReviews,
      });
    } catch (error) {
      setReviewsLoading(false);
      console.log('errror', error);
    }
  };

  useEffect(() => {
    const existingData = salonReviews?.[salonId];

    if (!existingData || existingData.length === 0) {
      // Normal fetch with loader
      dispatch(fetchSalonReviewsById({ salonId: salonId }));
    } else {
      // Silent refresh (no loader)
      dispatch(fetchSalonReviewsById({ salonId: salonId, silent: true }));
    }
  }, [salonId]);
  useEffect(() => {
    fetchSalonReviewsHandler();
  }, []);
  return (
    <Background contentContainerStyle={{ paddingBottom: responsiveHeight(2) }}>
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
            title={`${Number(reviewDetails?.avgRating)?.toFixed(2)}  (${
              reviewDetails?.totalRatings
            })`}
            textSize={2.2}
            textColor={AppColors.DARKGRAY}
          />
        </View>
      </View>

      <LineBreak space={2} />
      {isLoading ? (
        <View>
          <ReviewsLoader
            data={[1, 2, 3, 4, 5, 6, 7]}
            isHorizontal={false}
            width={90}
          />
        </View>
      ) : reviews?.length < 1 ? (
        <View style={{ marginVertical: responsiveHeight(1.5) }}>
          <AppText
            textAlignment="center"
            textColor={AppColors.WHITE}
            textSize={2.5}
            title="No Reviews Found"
          />
        </View>
      ) : (
        <FlatList
          data={reviews}
          ItemSeparatorComponent={<LineBreak space={2} />}
          renderItem={({ item }) => (
            <ReviewCard
              style={{ width: responsiveWidth(90) }}
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

      <View>
        <StyleButton
          onPress={() =>
            navigation.navigate('RateYourExperience', {
              productRating: false,
              salonId,
              productId: null,
            })
          }
        >{`Add Review`}</StyleButton>
      </View>
    </Background>
  );
};

export default AllReviews;
