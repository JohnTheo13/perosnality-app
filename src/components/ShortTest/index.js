import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { get } from '../../api';

class ShortTest extends Component {
  static navigationOptions = ({
    navigation: { state: { params: { testSession: { test: { name } } } } }
  }) => ({
    title: name
  });

  constructor(props) {
    super(props);
    this.state = { testData: {}, loading: true };
  }

  async componentDidMount() {
    const {
      navigation: { state: { params: { testSession: { state, test: { steps } } } } }
    } = this.props;
    if (state === 'not-started') {
      const testData = await get(`step/${steps[0]}/roles`);
      // console.log(testData);
      this.setState({ testData, loading: false });
    }
  }

  render() {
    const { loading, testData: { step, roles } } = this.state
    console.log(step)
    if (loading) {
      return <Text>loading</Text>
    }
    return (
      <View>
        {step && step.type === 'checklist'
          ? <Text>checklist</Text>
          : <Text>order</Text>
        }
      </View>
    );
  }
}

export default ShortTest;
