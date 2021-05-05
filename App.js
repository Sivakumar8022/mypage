import React from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';

import MainStackNavigator from './src/Navigations/AppNaviagtion';
import SignUpScreen from './src/Screens/SignUpScreen';
//import LoginScreen from './src/Screens/LoginScreen';
import MobileScreen from './src/Screens/MobileScreen'
import HomeScreen from './src/Screens/HomeScreen'
import Uploadimage from './src/Screens/Uploadimage'
import Profile from './src/Screens/Profile'

export default class App extends React.Component {
  render() {
    return (
      // <Uploadimage />
      < MainStackNavigator />
    )
  }

};
