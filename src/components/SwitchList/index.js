/* eslint-disable one-var */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';
import { get } from '../../api';
import SwitchItem from './SwitchItem';

class SwitchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mostRepresentativeTypes: [],
      rolesList: [],
      loading: true
    };
  }

  async componentDidMount() {
    const rolesList = await get('roles');
    this.setState({ rolesList, loading: false });
  }

  getValue = (roleId) => {
    const { mostRepresentativeTypes } = this.state;
    return mostRepresentativeTypes.findIndex(role => role.roleId === roleId) > -1;
  }

  toogle = (roleId) => {
    const { mostRepresentativeTypes, rolesList } = this.state,
      updated = Array.from(mostRepresentativeTypes),
      role = rolesList.find(r => r.roleId === roleId),
      isIn = updated.findIndex(r => r.roleId === roleId);
    if (isIn === -1) {
      updated.push(role);
      this.setState({ mostRepresentativeTypes: updated });
      return;
    }
    updated.splice(isIn, 1);
    this.setState({ mostRepresentativeTypes: updated });
  }

  onPress = () => {
    const { mostRepresentativeTypes } = this.state,
      { onNext } = this.props,
      data = { mostRepresentativeTypes };
    onNext(data);
  }

  render() {
    const { rolesList, loading, mostRepresentativeTypes: { length } } = this.state;

    if (loading) {
      return <Text>Loading skata</Text>;
    }

    return (
      <View>
        {rolesList.map(item => (
          <SwitchItem
            key={item.id}
            value={this.getValue(item.roleId)}
            onValueChange={() => this.toogle(item.roleId)}
            name={item.name}
            disabled={length === 4 && !this.getValue(item.roleId)}
          />
        ))}
        <Button
          onPress={this.onPress}
          title="Next"
          color="#841584"
          disabled={length < 4}
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}

export default SwitchList;
