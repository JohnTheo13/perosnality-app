// @flow

import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { get } from '../../api';
import TestCard from '../TestCard';

const StartingScreen = ({ navigation }) => {
  const { test } = navigation.state.params;
  if (test.state === 'not-started') {
    return (
      <View>
        <Button
          onPress={() => alert('button 1')}
          title="Start Test"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
  return (
    <View>
      {test.state === 'finished' && (
        <Button
          onPress={() => alert('button 1')}
          title="Start New Test"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      )}
      <Button
        onPress={() => alert('button 2')}
        title={test.state === 'finished' ? 'See results' : 'Resume Test'}
        color="#841585"
        accessibilityLabel="Learn more about this one button"
      />
    </View>
  );
};


export default StartingScreen;
