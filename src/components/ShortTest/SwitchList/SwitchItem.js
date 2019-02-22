import React from 'react';
import { Switch, Text } from 'react-native';
import styled from 'styled-components/native';

const StyledView = styled.View`
  margin-top: 12;
  padding-left: 12;
  padding-right: 12;
  border: 1px solid #00000021;
  flex-direction: row;
  justify-content: space-between;
`;

const SwitchItem = ({ name, ...props }) => (
  <StyledView>
    <Text style={{ fontSize: 18 }}>{name}</Text>
    <Switch {...props} />
  </StyledView>
);

export default SwitchItem;
