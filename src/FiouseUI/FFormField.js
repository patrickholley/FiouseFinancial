import React from 'react';
import styled from 'styled-components';
import colors from '../constants/colors';

const FieldTextInput = styled.TextInput`
  fontSize: 20;
  width: 90%;
`;

export default class FFormField extends React.PureComponent {
  render() {
    return (
      <FieldTextInput
        autoCapitalize={this.props.autoCapitalize || 'none'}
        keyboardType={this.props.type === 'email' ? 'email-address' : 'default'}
        onChangeText={this.props.onChangeText}
        placeholder={this.props.placeholder}
        secureTextEntry={this.props.type === 'password'}
        selectionColor={colors[2]}
        underlineColorAndroid={colors[2]}
      />
    );
  }
}
