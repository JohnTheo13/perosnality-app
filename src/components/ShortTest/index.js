import React, { Component } from 'react';
import {
  StyleSheet,
  Text
} from 'react-native';
import OrderableList from './OrderableList';
import { get, post } from '../../api';
import SwitchList from './SwitchList';
import ShortResults from './ShortResults';

class ShortTest extends Component {
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
      testData: { testSession: { id, test: { steps } } }
    } = this.state;

    if (data.mostRepresentativeTypes) {
      const mostRepresentativeTypes = data.mostRepresentativeTypes.map(role => role.roleId);
      const testSession = await post(`answer/${id}`, {
        body: JSON.stringify({ stepId: steps[0].id, data: { mostRepresentativeTypes } }),
        headers: { 'content-type': 'application/json' }
      });
      const roles = data.mostRepresentativeTypes;
      this.setState({ testData: { testSession, roles } });
    }
  }

  onFinish = async (data) => {
    const {
      testData: { testSession: { id, test: { steps } } }
    } = this.state;

    if (data.mostRepresentativeOrdered) {
      const testSession = await post(`answer/${id}`, {
        body: JSON.stringify({ stepId: steps[1].id, data }),
        headers: {
          'content-type': 'application/json'
        }
      });
      this.setState({ testData: { testSession } });
    }
  }

  render() {
    const { loading, testData: { roles, testSession: { state, id } } } = this.state;

    switch (state) {
      case 'not-started':
        return <SwitchList onNext={this.onNext} />;
      case 'started':
        return roles ? <OrderableList data={roles} onFinish={this.onFinish} /> : <Text>loading</Text>;
      case 'finished':
        return <ShortResults sessionId={id} />;
      default:
        return <Text>loading</Text>;
    }
  }
}

export default ShortTest;
