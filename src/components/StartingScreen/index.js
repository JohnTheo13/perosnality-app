// @flow

import React, { Component } from 'react';
import { Button, Image, View } from 'react-native';
import styled from 'styled-components/native';

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
    switch (type) {
      case 'short':
        navigate('ShortTestScreen', { testSession });
        break;
      case 'long':
        navigate('LongTestScreen', { testSession });
        break;
      default:
        alert('something is wrong');
        break;
    }
  }

  render() {
    const { navigation: { state: { params: { testSession } } } } = this.props;
    return (
      <View>
        <StyledHeader>{testSession.test.name}</StyledHeader>
        <StyledText>{testSession.test.description}</StyledText>
        {testSession.state !== 'started' && (
          <Button
            onPress={this.testNavigation}
            title="Start New Test"
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
