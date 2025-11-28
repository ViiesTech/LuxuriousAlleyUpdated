/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import Background from '../../utils/Background';
import AppHeader from '../../components/AppHeader';
import { useIsFocused, useNavigation } from '@react-navigation/native';
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
import { Counter, CounterRedux } from '../../components/Counter';
import { ImageBaseUrl } from '../../assets/Utils/BaseUrl';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/CartSlice';
import { getReviewsByProductId, ShowToast } from '../../GlobalFunctions';
import moment from 'moment';
import { ReviewsLoader } from '../../components/Loaders';
import { fetchProductReviewsById } from '../../redux/DataSlice';

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

const ProductDetails = ({ route }) => {
  const navigation = useNavigation();
  const [selectedSize, setSelectedSize] = useState(0);
  const {
    _id,
    productName,
    images,
    avgRating,
    totalReviews,
    price,
    description,
    stock,
  } = route?.params?.data;
  const salonId = route?.params?.data?.salonId?._id;
  const { bName, bImage } = route?.params?.data?.salonId;
  console.log('salonId', salonId, 'bImage', bImage);
  const categoryId = route?.params?.data?.categoryId;
  console.log('productid', _id);
  const [count, setCount] = useState(1);
  const [count2, setCount2] = useState(0);
  const dispatch = useDispatch();
  const { cart } = useSelector(state => state.cart);
  const isFocused = useIsFocused();
  const existingSalon = cart.find(s => s.salonId === salonId);
  const existingProduct = existingSalon?.products?.find(
    p => p.productId === _id,
  );

  const quantity = existingProduct?.quantity ?? 1;

  console.log('avgRating.toFixed(0)', avgRating.toFixed(0));

  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewsData, setReviewsData] = useState([]);
  const [reviewDetails, setReviewDetails] = useState({
    avgRating: 0,
    totalRatings: 0,
  });
  const { productReviews, loading } = useSelector(state => state.data);
  console.log('reviewDetails', reviewDetails);

  const isLoading = loading?.productReviews;
  const reviews = productReviews?.[_id] || [];

  console.log('reviews', reviews);
  console.log('isLoading', isLoading);

  useEffect(() => {
    const existingData = productReviews?.[_id];

    if (!existingData || existingData.length === 0) {
      // Normal fetch with loader
      dispatch(fetchProductReviewsById({ productId: _id }));
    } else {
      // Silent refresh (no loader)
      dispatch(fetchProductReviewsById({ productId: _id, silent: true }));
    }
  }, [_id]);

  const fetchProductReviewsHandler = async () => {
    setReviewsLoading(true);
    try {
      const response = await getReviewsByProductId(_id);
      console.log('resssponse', response.averageRating);
      setReviewsLoading(false);
      setReviewsData(response?.data);
      setReviewDetails({
        avgRating: response?.averageRating || 0,
        totalRatings: response?.totalReviews || 0,
      });
    } catch (error) {
      setReviewsLoading(false);
      console.log('errror', error);
    }
  };

  useEffect(() => {
    fetchProductReviewsHandler();
  }, []);

  // const handleAddToCart = () => {
  //   if (count <= 0)
  //     return ShowToast('error', 'Please Specify Quantity Of Your Product');

  //   dispatch(
  //     addToCart({
  //       salonId,
  //       product: {
  //         productId: _id,
  //         productName,
  //         productImage: `${ImageBaseUrl}${images?.[0]}`,
  //         price,
  //         stock,
  //         quantity: count, // use selected count
  //       },
  //     }),
  //   );
  //   navigation.navigate('Cart');
  // };
  useEffect(() => {
    if (!existingProduct) {
      dispatch(
        addToCart({
          salonId,
          product: {
            productId: _id,
            productName,
            productImage: `${ImageBaseUrl}${images?.[0]}`,
            price,
            stock,
            quantity: 1, // only for initialization
          },
        }),
      );
    }
  }, [isFocused]);

  const handleAddToCart = () => {
    if (!quantity || quantity <= 0)
      return ShowToast('error', 'Please Specify Quantity Of Your Product');

    navigation.navigate('Cart'); // Redux already has the correct quantity
  };

  return (
    <Background contentContainerStyle={{ flex: 1 }}>
      <AppHeader showFvrtIcon={false} onPress={() => navigation.goBack()} />

      <View
        style={{
          marginVertical: responsiveHeight(2),
        }}
      >
        <Image
          source={{ uri: `${ImageBaseUrl}${images?.[0]}` }}
          style={{
            width: responsiveWidth(90),
            height: responsiveHeight(30),
            borderRadius: 15,
          }}
        />
        <LineBreak space={3} />
        <AppText
          title={productName}
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
              title={`$${price}`}
              textSize={2.5}
              textColor={AppColors.WHITE}
            />
            <AppText
              title={`(${stock} available)`}
              textSize={1.6}
              textColor={AppColors.DARKGRAY}
            />
          </View>
          <CounterRedux
            productName={productName}
            productImage={`${ImageBaseUrl}${images?.[0]}`}
            salonId={salonId}
            productId={_id}
            stock={stock}
            price={price}
          />{' '}
        </View>
        <LineBreak space={2} />
        <View
          style={{
            flexDirection: 'row',
            gap: responsiveWidth(3),
            alignItems: 'center',
          }}
        >
          {[...Array(Math.floor(Number(avgRating)))]?.map((_, index) => (
            <FontAwesome
              key={index}
              name="star"
              size={responsiveFontSize(2.5)}
              color={Color('gold')}
            />
          ))}
        </View>
        {/* <LineBreak space={2} /> */}
        {/* <View style={{ flexDirection: 'row', gap: responsiveWidth(4) }}>
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
        </View> */}

        {/* <View>
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
        </View> */}

        <LineBreak space={2} />

        <View>
          <AppText
            title={'Description'}
            textSize={2.5}
            textFontWeight
            textColor={AppColors.WHITE}
          />

          <AppText
            title={description}
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
                title={`${avgRating} (${totalReviews})`}
                textSize={2.2}
                textColor={AppColors.WHITE}
              />
            </View>
          </View>
        </View>

        <LineBreak space={2} />
        {isLoading ? (
          <View>
            <ReviewsLoader />
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
            contentContainerStyle={{ gap: 10 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <ReviewCard
                day={moment(item.createdAt).fromNow()}
                image={
                  item?.userId?.image
                    ? { uri: `${ImageBaseUrl}${item?.userId?.image}` }
                    : APPImages.userDummy
                }
                name={item?.userId?.username}
                rating={item?.stars}
                desc={item?.message}
              />
            )}
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
          <TouchableOpacity
            style={[styles.btnContainer, { width: 50, height: 50 }]}
            onPress={() =>
              navigation.navigate('ChatMessages', {
                receiverId: salonId,
                receiverName: bName,
                receiverImage: bImage,
              })
            }
          >
            <Ionicons
              name={'chatbox-outline'}
              size={responsiveFontSize(3)}
              color={AppColors.WHITE}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleAddToCart}
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
          {/* _id,
    productName,
    images,
    avgRating,
    totalReviews,
    price,
    description,
    stock, */}
          <StyleButton
            btnWidth={responsiveWidth(35)}
            justifyContent={'center'}
            fontSize={2.3}
            color={AppColors.BLACK}
            background={APPImages.buy_now}
            btnHeight={responsiveHeight(6)}
            onPress={() => {
              if (count <= 0) {
                return ShowToast(
                  'error',
                  'Please Specify Quantity Of Your Product',
                );
              }
              navigation.navigate('Checkout', {
                isAddToCart: false,
                salonId,
                productId: _id,
                productName,
                images,
                price,
                stock,
                count,
              });
            }}
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
