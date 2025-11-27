/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/Routes';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { store } from './src/redux/Store';
import SystemNavigationBar from 'react-native-system-navigation-bar';

const App = () => {

  useEffect(() => {
    // hide nav bar when app loads
    SystemNavigationBar.stickyImmersive();
  }, []);

  const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#220A6D', // use your desired color here
  },
};
  return (
    <Provider store={store}>
      <NavigationContainer theme={MyTheme}>
        <Routes />
        <Toast />
      </NavigationContainer>
    </Provider>
  )
}

export default App