import React, { Component } from 'react';
import {
  StyleSheet,
  Text
} from 'react-native';
import OrderableList from '../OrderableList';
import { get, post } from '../../api';
import SwitchList from '../SwitchList';

class ShortTest extends Component {
  static navigationOptions = ({
    navigation: { state: { params: { testSession: { test: { name } } } } }
  }) => ({
    title: name
  });

  constructor(props) {
    super(props);
    const { navigation: { state: { params: { testSession } } } } = this.props;
    this.state = { testSession, loading: true, roles: [] };
  }

  async componentDidMount() {
    const {
      navigation: { state: { params: { testSession: { userId, state, test: { id, steps } } } } }
    } = this.props;
    if (state !== 'not-started') {
      const testSession = await get(`tests/${id}/sessions/${userId}`);
      console.log(testSession);
      this.setState({ testSession, loading: false });
    }
  }

  onNext = async (data) => {
    const { testSession: { id, test: { steps } } } = this.state;

    if (data.mostRepresentativeTypes) {
      const mostRepresentativeTypes = data.mostRepresentativeTypes.map(role => role.roleId);
      const testSession = await post(`answer/${id}`, {
        body: JSON.stringify({ stepId: steps[0].id, data: { mostRepresentativeTypes } }),
        headers: {
          'content-type': 'application/json'
        }
      });
      this.setState({ testSession, roles: data.mostRepresentativeTypes });
    }
  }

  render() {
    const { roles, testSession: { state, answers } } = this.state;

    switch (state) {
      case 'not-started':
        return <SwitchList onNext={this.onNext} />;
      case 'started':
        return <OrderableList data={roles}/>;
      case 'finished':
        return <Text>finished</Text>;
      default:
        return <Text>loading</Text>;
    }
  }
}

export default ShortTest;
