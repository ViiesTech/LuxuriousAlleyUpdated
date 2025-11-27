import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Auth from './Auth';
import Main from './Main';
import OnBoarding from './OnBoarding';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();
const Routes = () => {
  const { token, userData } = useSelector(state => state?.user);
  console.log('userData', userData);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {token && userData?.location?.coordinates?.length ? (
        <Stack.Screen name="Main" component={Main} />
      ) : token && userData?.location?.coordinates?.length < 1 ? (
        <Stack.Screen name="OnBoarding" component={OnBoarding} />
      ) : (
        <Stack.Screen name="Auth" component={Auth} />
      )}
    </Stack.Navigator>
  );
};

export default Routes;
