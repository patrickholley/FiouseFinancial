import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';

export default class Button extends React.PureComponent {
  render() {
    const AccountButton = styled.TouchableOpacity`
      backgroundColor: ${props => props.backgroundColor};
    `;

    return (
      <AccountButton backgroundColor={this.props.backgroundColor}>
        <Text style={{color: this.props.color }}>{this.props.text}</Text>
      </AccountButton>
    );
  }
}
