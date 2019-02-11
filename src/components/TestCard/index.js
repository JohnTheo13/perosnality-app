// @flow
import React from 'react';
import { TouchableHighlight, StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native'
import { post } from '../../api';

const StyledText = styled.Text`
  font-size: 14;
  color: #0000008a;
`;

const StyledView = styled.View`
  background: #e9eaee;
  padding: 24px;
  border: 0.5px solid #00000021;
  margin-bottom: 12px;
`;

const handleClick = async (id, deviceId, navigate) => {
  const test = await post(`tests/${id}/sessions/${deviceId}`);
  navigate('StartingScreen', { test });
};

const TestCard = ({
  name, description, id, navigation: { navigate }, deviceId
}) => (
  <TouchableHighlight onPress={() => handleClick(id, deviceId, navigate)}>
    <StyledView>
      <StyledText style={{ fontSize: 18, fontWeight: 'bold' }}>{name}</StyledText>
      <StyledText>{description}</StyledText>
    </StyledView>
  </TouchableHighlight>
);

export default TestCard;
