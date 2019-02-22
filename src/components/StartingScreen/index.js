// @flow

import React, { Component } from 'react';
import { Button, Image, View } from 'react-native';
import styled from 'styled-components/native';
import { post } from '../../api';

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

const screen = {
  short: 'ShortTestScreen',
  long: 'LongTestScreen'
};

class StartingScreen extends Component {
  static navigationOptions = ({
    navigation: { state: { params: { testSession: { test: { name } } } } }
  }) => ({
    title: name
  });

  testNavigation = () => {
    const {
      navigation: { navigate, state: { params: { testSession: { test: { type } }, testSession } } }
    } = this.props;
    // console.log(testSession)
    navigate(screen[type], { testSession });
  }

  restartTest = async () => {
    const {
      navigation: { navigate, state: { params: { testSession: { id, test: { type } } } } }
    } = this.props;
    const { testSession } = await post(`tests/sessions/${id}`); 
    console.log(testSession)
    navigate(screen[type], { testSession });
  }

  render() {
    const { navigation: { state: { params: { testSession } } } } = this.props;
    return (
      <View>
        <StyledHeader>{testSession.test.name}</StyledHeader>
        <StyledText>{testSession.test.description}</StyledText>
        {testSession.state === 'finished' ? (
          <Button
            onPress={this.restartTest}
            title="Start Test again"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        ) : (
          <Button
            onPress={this.testNavigation}
            title="Start Test"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        )}
        {testSession.state !== 'not-started' && (
          <Button
            onPress={this.testNavigation}
            title={testSession.state === 'finished' ? 'See results' : 'Resume Test'}
            color="#841585"
            accessibilityLabel="Learn more about this one button"
          />
        )}
        <Image source={require('../../rolesImgs/all-roles.png')} />
      </View>
    );
  }
}


export default StartingScreen;
