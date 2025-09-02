/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, TouchableOpacity, Animated} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive_Dimensions';
import AppText from './AppTextComps/AppText';
import AppColors from '../utils/AppColors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import { Color } from '../utils/Colors';

type props = {
  img?: any;
  title?: string;
  location?: string;
  KM?: string;
  Rating?: number;
  TotalNoOfRating?: number;
  component?: any;
  isShowDeleteIcon?: any;
  setIsShowDeleteIcon?: any;
  itemId?: any;
  onPress?: any;
  setShowRemoveModal?:any;
};

const SaloonsCard = ({
  KM,
  Rating,
  TotalNoOfRating,
  img,
  location,
  title,
  component,
  setIsShowDeleteIcon,
  itemId,
  isShowDeleteIcon,
  setShowRemoveModal,
}: props) => {
  const navigation = useNavigation();
  const translateX = useRef(new Animated.Value(0)).current;
  const isOpen = isShowDeleteIcon?.id === itemId;

  const handlePress = () => {
    if (!isOpen) {
      setIsShowDeleteIcon({id: itemId, shown: true});
    } else {
      setIsShowDeleteIcon({id: 0, shown: false});
    }
  };

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isOpen ? -80 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  return (
    <Animated.View style={component ? {transform: [{translateX}]} : {}}>
      <TouchableOpacity
        onPress={() => {
          if (component) {
            handlePress();
          } else {
            navigation.navigate('HomeDetails');
          }
        }}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              padding: 10,
              borderRadius: 10,
              width: responsiveWidth(90),
              alignSelf: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: Color('gold'),
              backgroundColor: Color('cardColor'),
            }}>
            <Image
              source={img}
              style={{
                height: responsiveHeight(10),
                width: responsiveHeight(10),
                resizeMode: 'contain',
                borderRadius: 10,
                marginRight: 10,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: responsiveWidth(60),
              }}>
              <View style={{gap: 5}}>
                <View style={{flexDirection: 'row', width: responsiveWidth(56), justifyContent: 'space-between', alignItems: 'center'}}>
                <AppText
                  title={title}
                  textColor={AppColors.WHITE}
                  textSize={2.5}
                  textFontWeight
                  />
                <AppText
                  title={`${KM} km`}
                  textColor={AppColors.WHITE}
                  textSize={1.8}
                  />
                  </View>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                  <Ionicons
                    name={'location-outline'}
                    size={responsiveFontSize(2)}
                    color={AppColors.DARKGRAY}
                  />
                  <AppText
                    title={location}
                    textSize={2}
                    textColor={AppColors.WHITE}
                  />
                </View>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                  <Entypo
                    name={'star'}
                    size={responsiveFontSize(2.5)}
                    color={'#FFD33C'}
                  />
                  <AppText title={Rating} textSize={2} textColor={Color('gold')} textFontWeight />
                  <AppText
                    title={`(${TotalNoOfRating})`}
                    textSize={1.5}
                    textColor={AppColors.WHITE}
                  />
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => setShowRemoveModal(true)}
            style={{
              backgroundColor: '#FA52521A',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: responsiveWidth(2),
              paddingHorizontal: responsiveWidth(2.7),
              borderRadius: 10,
              borderWidth: 1,
              borderColor: Color('gold'),
              gap: 5,
            }}>
            <AntDesign
              name={'delete'}
              size={responsiveFontSize(2.5)}
              color={Color('gold')}
            />
            <AppText
              title="Remove"
              textColor={Color('gold')}
              textSize={1.7}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default SaloonsCard;
