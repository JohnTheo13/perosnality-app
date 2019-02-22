// @flow

import React, { Component } from 'react';
import { View, Image } from 'react-native';
import CustomButton from '../Button';
import { post } from '../../api';
import { Description } from './styled';

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
        <Description>{testSession.test.description}</Description>
        <Image style={{ marginTop: 24 }} source={require('../../rolesImgs/all-roles.png')} />
        {testSession.state === 'finished' ? (
          <CustomButton
            onPress={this.restartTest}
            title="Start Test again"
            color="#841584"
          />
        ) : (
          <CustomButton
            onPress={this.testNavigation}
            title="Start Test"
            color="#841584"
          />
        )}
        {testSession.state !== 'not-started' && (
          <CustomButton
            onPress={this.testNavigation}
            title={testSession.state === 'finished' ? 'See results' : 'Resume Test'}
            color="#841585"
          />
        )}
      </View>
    );
  }
}


export default StartingScreen;
