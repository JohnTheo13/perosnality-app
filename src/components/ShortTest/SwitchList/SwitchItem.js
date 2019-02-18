import React from 'react';
import { Switch, View, Text } from 'react-native';

const SwitchItem = ({ name, ...props }) => (
  <View>
    <Text>{name}</Text>
    <Switch {...props} />
  </View>
);

export default SwitchItem;
