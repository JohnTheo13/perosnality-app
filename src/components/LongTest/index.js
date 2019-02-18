import React, { Component } from 'react';
import {
  StyleSheet,
  Text
} from 'react-native';
import { get } from '../../api';
import Orderable from './Orderable';

class LongTest extends Component {
  static navigationOptions = ({
    navigation: { state: { params: { testSession: { test: { name } } } } }
  }) => ({
    title: name
  });

  constructor(props) {
    super(props);
    const { navigation: { state: { params: { testSession } } } } = this.props;
    this.state = { testData: { testSession }, loading: true };
  }

  async componentDidMount() {
    const {
      navigation: { state: { params: { testSession: { userId, state, test: { id, steps } } } } }
    } = this.props;
    if (state !== 'not-started') {
      const testData = await get(`tests/${id}/short/${userId}`);
      this.setState({ testData, loading: false });
      return;
    }
    this.setState({ loading: false });
  }

  render() {
    const {
      loading, testData: {
        testSession: {
          state, id, lastStep, test: { steps }
        }
      }
    } = this.state;
    const activeStep = state === 'started' ? lastStep : steps[0];
console.log(this.state.testData)
    if (state !== 'finished') {
      return <Orderable step={activeStep} /> // step[0].id || lastStepId
    }
    return <Text>finished</Text> // sesionId
  }
}

export default LongTest;
