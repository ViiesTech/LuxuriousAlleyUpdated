/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Image } from 'react-native';
import Background from '../../utils/Background';
import AppHeader from '../../components/AppHeader';
import StyleButton from '../../components/StyleButton';
import LineBreak from '../../components/LineBreak';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import AppColors from '../../utils/AppColors';
import { Color } from '../../utils/Colors';
import AppText from '../../components/AppTextComps/AppText';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import APPImages from '../../assets/APPImages';
import { useNavigation } from '@react-navigation/native';
import { getServicesByStylistId, ShowToast } from '../../GlobalFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStylistServices } from '../../redux/DataSlice';
import { ImageBaseUrl } from '../../assets/Utils/BaseUrl';
import { StylistLoader } from '../../components/Loaders';

const cardData = [
  {
    id: 1,
    profImg: APPImages.CENTRALSALOONS,
    name: 'Hair Color',
    designation: 'Service',
    ratingStatus: '',
  },
  {
    id: 2,
    profImg: APPImages.CENTRALSALOONS,
    name: 'Hair Cutting',
    designation: 'Service',
    ratingStatus: '',
  },
  {
    id: 3,
    profImg: APPImages.CENTRALSALOONS,
    name: 'Facial',
    designation: 'Service',
    ratingStatus: '',
  },
  {
    id: 4,
    profImg: APPImages.CENTRALSALOONS,
    name: 'Gel Manicure/Pedicure',
    designation: 'Service',
    ratingStatus: '',
  },
];

const ChooseServices = ({ route }) => {
  const navigation = useNavigation();
  const [isSelectedProfile, setIsSelectedProfile] = useState({});
  const { stylistId, salonId, stylistName } = route?.params;
  const { stylistServices, stylistServicesCache, loading } = useSelector(
    state => state.data,
  );
  console.log('salonId====', salonId?._id);
  console.log('route', route.params);
  console.log('stylistId', stylistId);
  console.log('isSelectedProfile', isSelectedProfile);

  // salonId,
  //               serviceId,
  //               stylistId: isSelectedProfile?.id,
  //               stylistName: isSelectedProfile?.stylistName,
  //               servicePrice,
  const isLoading = loading?.stylistServices;
  const formattedSalonId = salonId?._id;
  const dispatch = useDispatch();
  useEffect(() => {
    const cacheKey = `${formattedSalonId}_${stylistId}`;
    const cachedData = stylistServicesCache[cacheKey];

    if (cachedData) {
      // Instantly use cached data
      dispatch({
        type: 'data/setStylistServices',
        payload: cachedData,
      });

      // Silent refresh in background
      dispatch(
        fetchStylistServices({
          salonId: formattedSalonId,
          technicianId: stylistId,
          silent: true,
        }),
      );
    } else {
      // Normal fetch
      dispatch(
        fetchStylistServices({
          salonId: formattedSalonId,
          technicianId: stylistId,
        }),
      );
    }
  }, [formattedSalonId, stylistId]);
  return (
    <Background contentContainerStyle={{ flexGrow: 1 }}>
      <AppHeader onPress={() => navigation.goBack()} title="Choose Service" />

      <View style={{}}>
        {isLoading ? (
          <StylistLoader />
        ) : stylistServices && stylistServices?.length > 0 ? (
          <FlatList
            contentContainerStyle={{
              marginBottom: responsiveHeight(5),
            }}
            data={stylistServices}
            ItemSeparatorComponent={() => <LineBreak space={2} />}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    setIsSelectedProfile({
                      id: item?._id,
                      serviceName: item?.serviceName,
                      price: item?.price,
                    })
                  }
                  style={{
                    flexDirection: 'row',
                    paddingLeft: responsiveWidth(3),
                    borderRadius: 10,
                    gap: responsiveWidth(5),
                    paddingVertical: responsiveHeight(1.2),
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor:
                      isSelectedProfile.id === item?._id
                        ? AppColors.WHITE
                        : Color('gold'),
                    backgroundColor:
                      isSelectedProfile.id === item?._id
                        ? Color('gold')
                        : Color('lightTheme'),
                  }}
                >
                  <Image
                    source={
                      item?.images?.length
                        ? { uri: `${ImageBaseUrl}${item?.images?.[0]}` }
                        : APPImages.userDummy2
                    }
                    style={{
                      width: responsiveWidth(15),
                      height: responsiveHeight(7),
                      borderRadius: 10,
                    }}
                  />
                  <View>
                    <AppText
                      title={item?.serviceName}
                      textSize={2.2}
                      textColor={
                        isSelectedProfile.id === item?._id
                          ? AppColors.BLACK
                          : AppColors.WHITE
                      }
                    />

                    <AppText
                      title="Service"
                      textSize={1.9}
                      textColor={
                        isSelectedProfile.id === item?._id
                          ? AppColors.BLACK
                          : AppColors.DARKGRAY
                      }
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      justifyContent: 'flex-end',
                      paddingHorizontal: 15,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingHorizontal: item.ratingStatus ? 10 : 0,
                        paddingVertical: item.ratingStatus ? 6 : 0,
                        borderRadius: 10,
                        alignItems: 'center',
                        backgroundColor:
                          isSelectedProfile.id === item?._id
                            ? AppColors.WHITE
                            : Color('gold'),
                        gap: 10,
                      }}
                    >
                      {item.ratingStatus && (
                        <SimpleLineIcons
                          name={'badge'}
                          size={responsiveFontSize(1.8)}
                          color={AppColors.BLACK}
                        />
                      )}
                      <AppText
                        title={item.ratingStatus}
                        textSize={1.8}
                        textColor={AppColors.BLACK}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <View
            style={{
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: responsiveHeight(5),
            }}
          >
            <AppText
              textColor={AppColors.WHITE}
              textSize={2.5}
              textFontWeight
              title={'No Services Found'}
            />
          </View>
        )}

        <LineBreak space={4} />

        <View>
          <StyleButton
            onPress={() =>
              !isSelectedProfile?.id
                ? ShowToast('error', 'Please Choose Service To Proceed')
                : navigation.navigate('DateAndTimeSelection', {
                    salonId,
                    stylistName,
                    serviceId: isSelectedProfile,
                    stylistId,
                  })
            }
          >
            Select & Continue
          </StyleButton>
        </View>
      </View>
    </Background>
  );
};

export default ChooseServices;
