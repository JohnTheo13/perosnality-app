/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { createStackNavigator, createAppContainer } from 'react-navigation';
import {
  Home, StartingScreen, ShortTest, LongTest
} from './src/components';

const App = createStackNavigator({
  Home,
  StartingScreen,
  ShortTestScreen: ShortTest,
  LongTestScreen: LongTest
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
