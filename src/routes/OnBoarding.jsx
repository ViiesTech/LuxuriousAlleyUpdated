import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import SetLocation from '../screens/main/SetLocation';
import UseCurrentLocation from '../screens/main/UseCurrentLocation';

const OnBoarding = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SetLocation" component={SetLocation} />
      <Stack.Screen name="UseCurrentLocation" component={UseCurrentLocation} />
    </Stack.Navigator>
  );
};

export default OnBoarding;
