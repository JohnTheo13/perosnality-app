import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { get } from '../../../api';

class ShortResults extends Component {
  constructor(props) {
    super(props);
    this.state = { results: [] };
  }

  async componentDidMount() {
    const { sessionId } = this.props;
    const results = await get(`result/${sessionId}`);
    console.log(results);
  }

  render() {
    return (
      <View>
        <Text>results</Text>
      </View>
    );
  }
}

export default ShortResults;
