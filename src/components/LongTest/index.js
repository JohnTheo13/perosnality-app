import React, { Component } from 'react';
import {
  StyleSheet,
  Text
} from 'react-native';
import { get, post } from '../../api';
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

  onNext = async (data) => {
    const {
      testData: { testSession: { id, lastStep, test: { steps } } }
    } = this.state;
    const stepId = lastStep ? lastStep.id : steps[0].id;
    if (data.mostRepresentativeOrdered) {
      const testSession = await post(`answer/${id}`, {
        body: JSON.stringify({ stepId, data }),
        headers: { 'content-type': 'application/json' }
      });
      this.setState({ testData: { testSession } });
    }
  }

  render() {
    const {
      loading, testData: {
        testSession: {
          state, id, lastStep, test: { steps, steps: { length } }
        }
      }
    } = this.state;
    const activeStep = lastStep ? steps[lastStep.sequenceNumber - 1] : steps[0]; // step[0].id || lastStepId
    const isLast = lastStep && lastStep.sequenceNumber === length;
console.log(this.state.testData)
    if (state !== 'finished') {
      return (
        <Orderable
          step={activeStep}
          isLast={isLast}
          length={length}
          onNext={this.onNext}
        />
      );
    }
    return <Text>finished</Text> // sesionId
  }
}

export default LongTest;
