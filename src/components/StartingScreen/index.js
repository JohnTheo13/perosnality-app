// @flow

import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { get } from '../../api';
import TestCard from '../TestCard';

const StyledHeader = styled.Text`
  font-size: 24;
  color: #0000008a;
  margin-bottom: 24;
  font-weight: bold;
`;

const StyledText = styled.Text`
  font-size: 14;
  color: #0000008a;
`;

const StartingScreen = ({ navigation }) => {
  const { testSession } = navigation.state.params;
  console.log(navigation)
  return (
    <View>
      <StyledHeader>{testSession.test.name}</StyledHeader>
      <StyledText>{testSession.test.description}</StyledText>
      {testSession.state !== 'started' && (
        <Button
          onPress={() => alert('button 1')}
          title="Start New Test"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      )}
      {testSession.state !== 'not-started' && (
        <Button
          onPress={() => alert('button 2')}
          title={testSession.state === 'finished' ? 'See results' : 'Resume Test'}
          color="#841585"
          accessibilityLabel="Learn more about this one button"
        />
      )}
    </View>
  );
};


export default StartingScreen;
