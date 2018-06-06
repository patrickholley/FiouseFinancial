import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';

const ButtonWrapper = styled.TouchableOpacity`
  backgroundColor: ${props => props.backgroundColor};
  height: 36;
  borderRadius: 3;
  display: flex;
  justifyContent: center;
  alignItems: center;
`;

const ButtonContent = styled.Text`
  color: ${props => props.color};
  fontSize: 16;
  fontWeight: bold,
`;

export default class Button extends React.PureComponent {
  render() {
    return (
      <ButtonWrapper
        backgroundColor={this.props.backgroundColor}
        onPress={this.props.onPress}
        style={this.props.buttonStyles}
      >
        <ButtonContent
          color={this.props.textColor}
          style={this.props.textStyles}
        >
          {this.props.text.toUpperCase()}
        </ButtonContent>
      </ButtonWrapper>
    );
  }
}
