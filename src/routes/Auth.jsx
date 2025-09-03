import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Signup from '../screens/auth/Signup';
import Login from '../screens/auth/Login';
import Otp from '../screens/auth/Otp';
import SignIn from './../screens/auth/SignIn';
import Splash from './../screens/auth/Splash';
import SigninWithEmailAndPassword from './../screens/auth/SigninWithEmailAndPassword';
import ForgetPassword from './../screens/auth/ForgetPassword';
import NewPassword from './../screens/auth/NewPassword';
const Stack = createStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator initialRouteName='Splash' screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SigninWithEmailAndPassword" component={SigninWithEmailAndPassword} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="NewPassword" component={NewPassword} />
    </Stack.Navigator>
  );
};

export default Auth;
