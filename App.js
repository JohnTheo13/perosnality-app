/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './src/components/Home';
import AppHeader from './src/components/Header'

const App = createStackNavigator({
  Home,
  Head: AppHeader
}, {
  defaultNavigationOptions: {
    headerTintColor: '#ffffff',
    headerStyle: {
      backgroundColor: '#2e7ba0',
      height: 75
    },
    headerTitleStyle: {
      fontSize: 32
    }
  },
  navigationOptions: {
    headerLayoutPreset: 'center',
  }
});

export default createAppContainer(App);
