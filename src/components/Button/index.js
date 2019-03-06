import React from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';

const StyledButton = styled.TouchableOpacity`
  margin-top: 12;
  margin-bottom: 12;
  margin-left: 12;
  margin-right: 12;
  background-color: ${({ color }) => color};
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)}
  padding-top: 12;
  padding-bottom: 12;
  padding-left: 6;
  padding-right: 6;
  align-items: center;
  border-radius: 6;
  height: 48;
`;

const CustomButton = ({
  title, onPress, disabled, ...props
}) => (
  <StyledButton onPress={disabled ? () => null : onPress} disabled={disabled} {...props}>
    <Text style={{ color: '#ffffff' }}>{title}</Text>
  </StyledButton>
);

export default CustomButton;
