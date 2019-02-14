import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  Platform,
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
  check = (nextOr) => {
    console.log(nextOr);
  }

  renderRow = ({ data, active }) => <Row data={data} active={active} />;


  render() {
    const { data } = this.props;

    return (
      <SortableList
        onChangeOrder={this.check}
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
        data={data}
        renderRow={this.renderRow}
      />
    );
  }
}

export default OrderableList;
