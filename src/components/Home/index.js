// @flow

import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { get } from '../../api';
import TestCard from '../TestCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


class Home extends Component<{}> {
  static navigationOptions = {
    title: 'All your Testsa'
  }

  constructor(props) {
    super(props);
    this.state = { tests: undefined, deviceId: '' };
  }

  async componentDidMount() {
    const tests = await get('tests');
    const deviceId = DeviceInfo.getInstanceID();
    this.setState({ tests, deviceId });
  }

  render() {
    const { tests, deviceId } = this.state;
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        {tests
          && tests.map(test => <TestCard key={test.id} {...test} navigation={navigation} deviceId={deviceId} />)
        }
      </View>
    );
  }
}

export default Home;