/* eslint-disable one-var */
import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  Platform,
  Button,
  View
} from 'react-native';
import SortableList from 'react-native-sortable-list';
import Row from '../Row';

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
    const { step: { words } } = this.props;
    const wordIds = words.map(word => word.wordId);
    this.state = { wordIds, wordIndexes: [0, 1, 2, 3] };
  }

  componentWillReceiveProps(nextProps) {
    const { step: { words, id } } = nextProps;
    if (id !== this.props.step.id) { // eslint-disable-line
      const wordIds = words.map(word => word.wordId);
      this.setState({ wordIds });
    }
  }

  check = (wordIndexes) => {
    this.setState({ wordIndexes });
  }

  renderRow = ({ data, active }) => <Row data={data} active={active} />;

  onPress = () => {
    const { wordIds, wordIndexes } = this.state,
      { onNext } = this.props,
      mostRepresentativeOrdered = [];
    wordIndexes.forEach(index => mostRepresentativeOrdered.push(wordIds[index]));
    const data = { mostRepresentativeOrdered };
    onNext(data);
  }

  render() {
    const { step: { words }, isLast } = this.props;

    return (
      <View style={styles.container}>
        <SortableList
          onChangeOrder={this.check}
          style={styles.list}
          contentContainerStyle={styles.contentContainer}
          data={words}
          renderRow={this.renderRow}
        />
        <Button
          onPress={this.onPress}
          title={isLast ? 'Finish' : 'Next'}
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}

export default OrderableList;
