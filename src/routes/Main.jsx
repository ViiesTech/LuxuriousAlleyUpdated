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
import ChatList from './../screens/main/ChatList';
import ProductDetails from './../screens/main/ProductDetails';
import Cart from './../screens/main/Cart';
import Checkout from './../screens/main/Checkout';
import ChatMessages from './../screens/main/ChatMessages';
import AccountDetail from './../screens/main/profile/AccountDetail';
import PrivacyPolicy from './../screens/main/profile/PrivacyPolicy';
import HelpAndService from './../screens/main/profile/HelpAndService';
import About from './../screens/main/profile/About';
import Language from './../screens/main/profile/Language';
import Security from './../screens/main/profile/Security';
import Notification from './../screens/main/profile/Notification';
import AllProducts from './../screens/main/AllProducts';
import OrderDetails from '../screens/main/bookings/OrderDetails';

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
      <Stack.Screen
        name="SelectPaymentMethod"
        component={SelectPaymentMethod}
      />
      <Stack.Screen name="DownloadReceipt" component={DownloadReceipt} />
      <Stack.Screen name="ChatMessages" component={ChatMessages} />
      <Stack.Screen name="SearchLocation" component={SearchLocation} />
      <Stack.Screen name="ChooseServices" component={ChooseServices} />
      <Stack.Screen name="RateYourExperience" component={RateYourExperience} />
      <Stack.Screen name="SetLocation" component={SetLocation} />
      <Stack.Screen name="UseCurrentLocation" component={UseCurrentLocation} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="Language" component={Language} />
      <Stack.Screen name="Security" component={Security} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="AccountDetail" component={AccountDetail} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="HelpAndService" component={HelpAndService} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} />
      <Stack.Screen name="AllProducts" component={AllProducts} />
      <Stack.Screen name="MapView" component={MapView} />
      <Stack.Screen name="ChatList" component={ChatList} />
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
