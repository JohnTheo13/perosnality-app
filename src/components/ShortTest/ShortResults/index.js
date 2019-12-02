import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import { get } from '../../../api';
import WordCloud from '../../WordCloud';

const sortName = (a, b) => {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
};

const listGenarate = (results) => {
  const tagList = [];
  results.forEach((wordData) => {
    wordData.words.forEach((word) => {
      tagList.push({
        point: wordData.rank,
        title: word.name
      });
    });
  });
  return tagList.sort(sortName);
};

class ShortResults extends Component {
  constructor(props) {
    super(props);
    this.state = { results: [] };
  }

  async componentDidMount() {
    const { sessionId } = this.props;
    const { result } = await get(`result/${sessionId}`);
    console.log(result, 'skata');
    const results = listGenarate(result);
    this.setState({ results });
  }

  render() {
    const { results } = this.state;
    return (
      <ScrollView>
        {results.length > 0
          && (
          <WordCloud
            tagList={results}
            colorList={['#41c0ff', '#ff8041', '#ffdf41']}
            tagPaddingLeft={12}
            tagPaddingTop={12}
            tagPaddingRight={12}
            tagPaddingBottom={12}
            minFontSize={24}
          />
          )}
      </ScrollView>
    );
  }
}

export default ShortResults;
