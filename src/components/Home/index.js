// @flow

import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
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
  constructor(props) {
    super(props);
    this.state = { tests: undefined }
  }

  static navigationOptions = {
    title: 'All your Testsa'
  }

  async componentDidMount() {
    const tests = await get('tests')
    this.setState({ tests });
  }

  render() {
    const { tests } = this.state;
    return (
      <View style={styles.container}>
        {tests
          && tests.map(test => <TestCard key={test.id} {...test} />)
        }
      </View>
    )
  }
}

export default Home;