// @flow

import React, { Component } from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import { get } from '../../api';
import TestCard from '../TestCard';

class StartingScreen extends Component {
  render() {
    return (
      <View>
        <Button 
          onPress={() => alert('button 1')}
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button 
          onPress={() => alert('button 2')}
          title="Learn ONe"
          color="#841585"
          accessibilityLabel="Learn more about this one button"
        />
      </View>
    )
  }
}

export default StartingScreen;