/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AppColors from '../../utils/AppColors';
import AppHeader from '../../components/AppHeader';
import { useNavigation } from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Responsive_Dimensions';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AppText from '../../components/AppTextComps/AppText';
import APPImages from '../../assets/APPImages';
import LineBreak from '../../components/LineBreak';
import Background from '../../utils/Background';
import StyleButton from '../../components/StyleButton';
import { Color } from '../../utils/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTechnicians } from '../../redux/DataSlice';
import { ImageBaseUrl } from '../../assets/Utils/BaseUrl';
import {
  ProductsLoader,
  SalonDetails,
  SalonLoader,
  ServiceLoader,
  StylistLoader,
} from '../../components/Loaders';
import { ShowToast } from '../../GlobalFunctions';

const cardData = [
  {
    id: 1,
    profImg: APPImages.CENTRALSALOONS,
    name: 'John Doe',
    designation: 'Stylist',
    ratingStatus: 'Top Rated',
  },
  {
    id: 2,
    profImg: APPImages.CENTRALSALOONS,
    name: 'Anna Lee',
    designation: 'Stylist',
    ratingStatus: 'Top Rated',
  },
  {
    id: 3,
    profImg: APPImages.CENTRALSALOONS,
    name: 'Ella Ford',
    designation: 'Stylist',
    ratingStatus: '',
  },
  {
    id: 4,
    profImg: APPImages.CENTRALSALOONS,
    name: 'Marsh Donnell',
    designation: 'Stylist',
    ratingStatus: '',
  },
];

const StylistSelect = ({ route }) => {
  const navigation = useNavigation();
  const [isSelectedProfile, setIsSelectedProfile] = useState({});
  const { serviceId, salonId, servicePrice } = route?.params;
  const dispatch = useDispatch();
  const { technicians, techniciansCache, loading } = useSelector(
    state => state?.data,
  );
  const formattedServiceId = serviceId?.id;
  console.log('formattedServiceId', formattedServiceId);
  console.log('salonId', salonId);
  console.log('serviceId====', serviceId);
  console.log('servicePrice', servicePrice);

  useEffect(() => {
    if (!formattedServiceId) return;

    const cachedTechs = techniciansCache[formattedServiceId];
    if (cachedTechs && cachedTechs.length > 0) {
      // ✅ Use cache instantly (optional: dispatch to set state)
      dispatch({
        type: 'data/setTechnicians',
        payload: cachedTechs,
      });

      // 🔄 Silent refresh in background
      dispatch(
        fetchTechnicians({ serviceId: formattedServiceId, silent: true }),
      );
    } else {
      // ❌ No cache — normal fetch
      dispatch(fetchTechnicians({ serviceId: formattedServiceId }));
    }
  }, [formattedServiceId]);

  return (
    <Background>
      <AppHeader
        onPress={() => navigation.goBack()}
        title="Choose Your Stylist"
      />

      <View
        style={{
          marginVertical: responsiveHeight(2),
        }}
      >
        <TouchableOpacity
          onPress={() => {
            if (technicians?.length > 0) {
              const randomIndex = Math.floor(
                Math.random() * technicians.length,
              );
              const randomStylist = technicians[randomIndex];
              setIsSelectedProfile({
                id: randomStylist._id,
                stylistName: randomStylist?.fullName,
              });
            }
          }}
          style={{
            flexDirection: 'row',
            borderRadius: 10,
            borderWidth:  1,
            borderColor: AppColors.themeColor,
            gap: responsiveWidth(5),
            paddingHorizontal: responsiveWidth(3),
            paddingVertical: responsiveHeight(1.5),
            alignItems: 'center',
            backgroundColor: Color('lightTheme'),
          }}
        >
          <View
            style={{
              backgroundColor: Color('gold'),
              width: responsiveWidth(15),
              height: responsiveHeight(7),
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Feather
              name={'users'}
              size={responsiveFontSize(3)}
              color={AppColors.WHITE}
            />
          </View>
          <View>
            <AppText
              title="Any Stylist"
              textSize={2}
              textColor={AppColors.WHITE}
            />

            <AppText
              title="Next available Stylist"
              textSize={1.8}
              textColor={AppColors.DARKGRAY}
            />
          </View>
        </TouchableOpacity>

        <LineBreak space={2} />
        <View>
          {loading?.technicians ? (
            <StylistLoader />
          ) : (
            <FlatList
              data={technicians}
              ItemSeparatorComponent={() => <LineBreak space={2} />}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      setIsSelectedProfile({
                        id: item?._id,
                        stylistName: item?.fullName,
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
                        item?.image
                          ? { uri: `${ImageBaseUrl}${item.image}` }
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
                        title={item?.fullName}
                        textSize={2.2}
                        textColor={
                          isSelectedProfile.id === item?._id
                            ? AppColors.BLACK
                            : AppColors.WHITE
                        }
                      />

                      <AppText
                        title={item?.designation}
                        textSize={1.9}
                        textColor={
                          isSelectedProfile.id === item._id
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
                            isSelectedProfile.id === item._id
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
          )}
        </View>

        <LineBreak space={4} />

        <View>
          <StyleButton
            // onPress={() => navigation.navigate('ChooseServices')}
            onPress={() => {
              !isSelectedProfile?.id
                ? ShowToast('error', 'Please Choose a Stylist')
                : navigation.navigate('DateAndTimeSelection', {
                    salonId,
                    serviceId,
                    stylistId: isSelectedProfile?.id,
                    stylistName: isSelectedProfile?.stylistName,
                    servicePrice,
                  });
            }}
          >
            Select & Continue
          </StyleButton>
        </View>
      </View>
    </Background>
  );
};

export default StylistSelect;
