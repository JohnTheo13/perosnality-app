// @flow
import React from 'react';
import { Text, StyleSheet } from 'react-native';

const style = {
    width: '100%',
    textAlign: 'center',
    padding: 20,
    marginBottom: 24,
    height: 75,
    fontSize: 26,
    backgroundColor: '#2e7ba0',
    color: '#ffffff'
};

const AppHeader = ({ title }) => <Text style={style}>{title}</Text>;

export default AppHeader