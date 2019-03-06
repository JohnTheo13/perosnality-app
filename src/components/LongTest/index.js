import React, { Component } from 'react';
import {
  StyleSheet,
  Text
} from 'react-native';
import { post } from '../../api';
import Orderable from './Orderable';
import ShowResults from './ShowResults';

class LongTest extends Component {
  static navigationOptions = ({
    navigation: { state: { params: { testSession: { test: { name } } } } }
  }) => ({
    title: name
  });

  constructor(props) {
    super(props);
    const { navigation: { navigate, state: { params: { testSession } } } } = this.props;
    this.props.navigation.goBack = () => navigate('Home'); // eslint-disable-line
    this.state = { testData: { testSession }, loading: true };
  }

  onNext = async (data) => {
    const {
      testData: { testSession: { id, step, test: { steps } } }
    } = this.state;
    const stepId = step ? steps[step.sequenceNumber].id : steps[0].id;
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
          state, id, step, test: { steps, steps: { length } }
        }
      }
    } = this.state;
    const activeStep = !step ? steps[0] : steps[step.sequenceNumber]; // step[0].id || stepId
    const isLast = step && step.sequenceNumber === length;
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
    return <ShowResults sessionId={id} />;
  }
}

export default LongTest;
