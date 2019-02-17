/* eslint-disable one-var */
import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  Platform,
  Animated,
  Button,
  View
} from 'react-native';
import SortableList from 'react-native-sortable-list';
import Row from './Row';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',

    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
    }),
  },

  title: {
    fontSize: 20,
    paddingVertical: 20,
    color: '#999999',
  },

  list: {
    flex: 1,
  },

  contentContainer: {
    width: window.width,

    ...Platform.select({
      ios: {
        paddingHorizontal: 30,
      },

      android: {
        paddingHorizontal: 0,
      }
    })
  }
});


class OrderableList extends Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    const mostRepresentativeOrdered = data.map(role => role.roleId);
    this.state = { mostRepresentativeOrdered };
  }

  check = (nextOr) => {
    this.setState({ mostRepresentativeOrdered: nextOr });
  }

  renderRow = ({ data, active }) => <Row data={data} active={active} />;

  onPress = () => {
    const { mostRepresentativeOrdered } = this.state,
      { onFinish } = this.props,
      data = { mostRepresentativeOrdered };
    onFinish(data);
  }

  render() {
    const { data } = this.props;

    return (
      <View style={styles.container}>
        <SortableList
          onChangeOrder={this.check}
          style={styles.list}
          contentContainerStyle={styles.contentContainer}
          data={data}
          renderRow={this.renderRow}
        />
        <Button
          onPress={this.onPress}
          title="Finish"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}

export default OrderableList;
