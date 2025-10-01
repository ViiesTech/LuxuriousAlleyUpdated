/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { Image, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/main/Home';
import HomeDetails from '../screens/main/HomeDetails';
import AllReviews from '../screens/main/AllReviews';
import StylistSelect from '../screens/main/StylistSelect';
import DateAndTimeSelection from '../screens/main/DateAndTimeSelection';
import BookingSummary from '../screens/main/BookingSummary';
import SelectPaymentMethod from '../screens/main/SelectPaymentMethod';
import DownloadReceipt from '../screens/main/DownloadReceipt';
import SearchLocation from '../screens/main/SearchLocation';
import MapView from '../screens/main/MapView';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Profile from '../screens/main/profile/Profile';
import Favourites from '../screens/main/favourites/Favourites';
import Booking from '../screens/main/bookings/Booking';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive_Dimensions';
import APPImages from '../assets/APPImages';
import EditProfile from '../screens/main/profile/EditProfile';
import { Color } from '../utils/Colors';
import AppColors from '../utils/AppColors';
import ChooseServices from './../screens/main/ChooseServices';
import SetLocation from './../screens/main/SetLocation';
import UseCurrentLocation from './../screens/main/UseCurrentLocation';
import RateYourExperience from './../screens/main/RateYourExperience';
import ProductDetails from './../screens/main/ProductDetails';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={MyTabs} />
      <Stack.Screen name="HomeDetails" component={HomeDetails} />
      <Stack.Screen name="AllReviews" component={AllReviews} />
      <Stack.Screen name="StylistSelect" component={StylistSelect} />
      <Stack.Screen
        name="DateAndTimeSelection"
        component={DateAndTimeSelection}
      />
      <Stack.Screen name="BookingSummary" component={BookingSummary} />
      <Stack.Screen name="SelectPaymentMethod" component={SelectPaymentMethod} />
      <Stack.Screen name="DownloadReceipt" component={DownloadReceipt} />
      <Stack.Screen name="SearchLocation" component={SearchLocation} />
      <Stack.Screen name="ChooseServices" component={ChooseServices} />
      <Stack.Screen name="RateYourExperience" component={RateYourExperience} />
      <Stack.Screen name="SetLocation" component={SetLocation} />
      <Stack.Screen name="UseCurrentLocation" component={UseCurrentLocation} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="MapView" component={MapView} />
      <Stack.Screen name="Profile" component={MyTabs} />
    </Stack.Navigator>
  );
};

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: responsiveHeight(12),
          paddingTop: responsiveHeight(1),
          backgroundColor: Color('btnText'),
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Shop & Book') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Favourites') {
            iconName = focused ? 'heart' : 'heart-outline';
          }

          if (route.name === 'Warz') {
            return (
              <Image
                source={APPImages.LOGO}
                style={{
                  width: responsiveWidth(6.5),
                  height: responsiveHeight(3.5),
                }}
              />
            );
          } else {
            return (
              <Ionicons
                name={iconName}
                size={size}
                color={focused ? Color('gold') : AppColors.DARKGRAY}
              />
            );
          }
        },
        tabBarLabel: ({ focused }) => (
          <Text
            style={{
              fontSize: responsiveFontSize(1.7),
              color: focused ? Color('gold') : AppColors.DARKGRAY,
            }}
          >
            {route.name}
          </Text>
        ),
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Shop & Book" component={Booking} />
      <Tab.Screen name="Favourites" component={Favourites} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default Main;
