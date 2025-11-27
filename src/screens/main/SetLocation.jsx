import React, { useEffect, useState } from 'react';
import Background from '../../utils/Background';
import SVGXml from '../../components/SVGXML';
import { AppIcons } from '../../assets/Icons';
import LineBreak from '../../components/LineBreak';
import AppText from '../../components/AppTextComps/AppText';
import AppColors from '../../utils/AppColors';
import StyleButton from '../../components/StyleButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { responsiveFontSize } from '../../utils/Responsive_Dimensions';
import {
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { ShowToast, updateUser } from '../../GlobalFunctions';
import Geolocation from 'react-native-geolocation-service';
import { useDispatch, useSelector } from 'react-redux';

const SetLocation = () => {
  const dispatch = useDispatch();
  const [latLng, setLatLng] = useState({
    latitude: null,
    longitude: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { _id } = useSelector(state => state?.user?.userData);
  console.log(_id, latLng);
  const updateUserLocation = async (lat, lng, locationName) => {
    console.log('latlng', latLng);
    try {
      await updateUser(_id, null, null, lng, lat, locationName,null, dispatch);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  const fetchAddressFromCoords = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
        {
          headers: { 'User-Agent': 'ReactNativeApp' },
        },
      );
      const json = await response.json();
      const address = json.address;

      // ✅ Create a short, readable address
      const shortAddress = [
        address?.suburb || address?.neighbourhood,
        address?.city || address?.town || address?.village,
        address?.state,
      ]
        .filter(Boolean) // removes undefined values
        .join(', ');

      console.log('Short Address:', shortAddress);

      updateUserLocation(lat, lng, shortAddress);
    } catch (error) {
      setIsLoading(false);
      ShowToast('error', 'Unable to fetch location name');
      console.log('Reverse geocoding error:', error);
    }
  };
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      console.log('granted', granted);
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };
  const getCurrentLocation = () => {
    setIsLoading(true);
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        console.log(position);
        setLatLng({ latitude, longitude });
        fetchAddressFromCoords(latitude, longitude); // ✅ call here with params
      },
      error => {
        ShowToast('error', error?.message);
        setIsLoading(false);

        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };
  // useEffect(() => {
  const initLocation = async () => {
    const granted = await requestLocationPermission();
    if (granted) {
      console.log('granted', granted);
      getCurrentLocation();
    }
  };

  // initLocation();
  // }, []);
  return (
    <Background>
      <LineBreak space={10} />
      <SVGXml icon={AppIcons.location} width={50} height={50} />
      <LineBreak space={2} />
      <AppText
        title={'Hello, nice to meet you!'}
        textSize={4}
        lineHeight={4.5}
        textFontWeight
        textColor={AppColors.WHITE}
        textwidth={65}
      />
      <LineBreak space={1.5} />
      <AppText
        title={'Set your location to start find salons around you'}
        textSize={2}
        textColor={AppColors.DARKGRAY}
        textwidth={70}
      />
      <LineBreak space={4} />
      <StyleButton
        onPress={initLocation}
        color={AppColors.BLACK}
        leftIcon={
          isLoading ? null : (
            <FontAwesome
              name={'send'}
              color={AppColors.BLACK}
              size={responsiveFontSize(2)}
            />
          )
        }
      >
        {isLoading ? (
          <ActivityIndicator size={'large'} color={AppColors.BLACK} />
        ) : (
          'Use current location'
        )}
      </StyleButton>
      <LineBreak space={2} />
      {/* <StyleButton onPress={() => nav.navigate('Home')} color={AppColors.BLACK}>
        Go to home
      </StyleButton> */}
      <LineBreak space={2} />
      <AppText
        title={
          'We only access your location while you are using this incredible app'
        }
        textSize={2}
        textColor={AppColors.DARKGRAY}
        textwidth={80}
      />
      <LineBreak space={4} />
      <TouchableOpacity onPress={() => ShowToast('info', 'Under Development')}>
        <AppText
          title={'or set your location manually'}
          textSize={2}
          textColor={AppColors.DARKGRAY}
          textwidth={80}
        />
      </TouchableOpacity>
    </Background>
  );
};

export default SetLocation;
