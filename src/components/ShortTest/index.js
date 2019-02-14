import React, { Component } from 'react';
import {
  StyleSheet,
  Text
} from 'react-native';
import OrderableList from '../OrderableList';
import { get, post } from '../../api';
import SwitchList from '../SwitchList';


const datas = [
  {
    image: 'https://placekitten.com/200/240',
    text: 'Chloe',
  },
  {
    image: 'https://placekitten.com/200/201',
    text: 'Jasper',
  },
  {
    image: 'https://placekitten.com/200/202',
    text: 'Pepper',
  },
  {
    image: 'https://placekitten.com/200/203',
    text: 'Oscar',
  },
  {
    image: 'https://placekitten.com/200/204',
    text: 'Dusty',
  },
  {
    image: 'https://placekitten.com/200/205',
    text: 'Spooky',
  },
  {
    image: 'https://placekitten.com/200/210',
    text: 'Kiki',
  },
  {
    image: 'https://placekitten.com/200/215',
    text: 'Smokey',
  },
  {
    image: 'https://placekitten.com/200/220',
    text: 'Gizmo',
  },
  {
    image: 'https://placekitten.com/220/239',
    text: 'Kitty',
  },
];

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

  // async componentDidMount() {
  //   const {
  //     navigation: { state: { params: { testSession: { state, test: { steps } } } } }
  //   } = this.props;
  //   if (state === 'not-started') {
  //     const testData = await get(`step/${steps[0].id}/roles`);
  //     console.log(testData);
  //     this.setState({ testData, loading: false });
  //   }
  // }

  onNext = async (data) => {
    const { navigation: { state: { params: { testSession: { id, test: { steps } } } } } } = this.props;
    console.log(steps[0]);
    if (data.mostRepresentativeTypes) {
      const test = await post(`answer/${id}`, {
        body: JSON.stringify({ stepId: steps[0], data }),
        headers: {
          'content-type': 'application/json'
        }
      });
      console.log(test);
      this.setState({ testData: test });
    }
  }

  render() {
    const { loading, testData: { step, roles } } = this.state;
    const {
      navigation: { state: { params: { testSession: { state, test: { steps } } } } }
    } = this.props;

    return state === 'not-started'
      ? <SwitchList onNext={this.onNext} />

      : <OrderableList data={datas} />;
  }
}

export default ShortTest;
