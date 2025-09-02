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

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={MyTabs} />
      <Tab.Screen name="HomeDetails" component={HomeDetails} />
      <Tab.Screen name="AllReviews" component={AllReviews} />
      <Tab.Screen name="StylistSelect" component={StylistSelect} />
      <Tab.Screen
        name="DateAndTimeSelection"
        component={DateAndTimeSelection}
      />
      <Tab.Screen name="BookingSummary" component={BookingSummary} />
      <Tab.Screen name="SelectPaymentMethod" component={SelectPaymentMethod} />
      <Tab.Screen name="DownloadReceipt" component={DownloadReceipt} />
      <Tab.Screen name="SearchLocation" component={SearchLocation} />
      <Tab.Screen name="ChooseServices" component={ChooseServices} />
      <Tab.Screen name="EditProfile" component={EditProfile} />
      <Tab.Screen name="MapView" component={MapView} />
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
          } else if (route.name === 'Booking') {
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
      <Tab.Screen name="Booking" component={Booking} />
      <Tab.Screen name="Favourites" component={Favourites} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default Main;
