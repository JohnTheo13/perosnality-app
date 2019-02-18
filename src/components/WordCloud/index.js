import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  cloudTagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class WordCloud extends Component {
  static defaultProps = {
    colorList: ['#cdd2d2', '#757b7c', '#2e3031'],
    minFontSize: 12,
    tagPaddingLeft: 30,
    tagPaddingTop: 30,
    tagPaddingRight: 30,
    tagPaddingBottom: 30,
  }

  constructor(props) {
    super(props);

    this.TagCloud = this.props.tagList.map((item, key) => {
      const tagContainerStyle = {
        paddingLeft: this.getRandomPaddingLeft(),
        paddingTop: this.getRandomPaddingTop(),
        paddingRight: this.getRandomPaddingRight(),
        paddingBottom: this.getRandomPaddingBottom(),
      };

      const tagStyle = {
        fontSize: this.props.minFontSize + (item.point * 4),
        color: this.props.colorList[item.point],
      };

      return (
        <View key={key} style={tagContainerStyle}>
          <Text style={tagStyle}>{item.title}</Text>
        </View>
      );
    });
  }

  getRandomPaddingLeft() {
    return Math.floor(Math.random() * this.props.tagPaddingLeft);
  }

  getRandomPaddingTop() {
    return Math.floor(Math.random() * this.props.tagPaddingTop);
  }

  getRandomPaddingRight() {
    return Math.floor(Math.random() * this.props.tagPaddingRight);
  }

  getRandomPaddingBottom() {
    return Math.floor(Math.random() * this.props.tagPaddingBottom);
  }

  orderData() {
    const result = [];
    const { tagList } = this.props;
    console.log(tagList)
    tagList.sort((a, b) => {
      if (a.point === b.point) return 0;
      else return a.point > b.point ? -1 : 1;
    });

    const maxPoint = tagList[0].point;
    let switchFlag = true;
    tagList.map((item, key) => {
      if (maxPoint === item.point) {
        result.push(item);
        return;
      }

      if (switchFlag) {
        result.unshift(item);
        switchFlag = false;
      } else {
        result.push(item);
        switchFlag = true;
      }
    });

    return result;
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.cloudTagContainer}>
          {this.TagCloud}
        </View>
      </View>
    );
  }
}

export default WordCloud;
