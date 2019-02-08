// @flow
import React from 'react';
import { TouchableHighlight, StyleSheet, Text, View } from 'react-native';

const style = StyleSheet.create({
  container: {
    backgroundColor: '#e9eaee',
    padding: 20,
    marginBottom: 12,
    borderColor: '#00000021',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
  },
  text: {
    fontSize: 14,
    color: '#0000008a'
  }
})

const TestCard = ({ name, description }) => (
  <TouchableHighlight onPress={() => alert('This is a button!')}>
    <View style={style.container}>
      <Text style={style.header}>{name}</Text>
      <Text style={style.text}>{description}</Text>
    </View>
  </TouchableHighlight>
);

export default TestCard;