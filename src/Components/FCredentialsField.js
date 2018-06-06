import React from 'react';
import { TextInput, View } from 'react-native';
import styled from 'styled-components';

import FWrapper from './FWrapper';

const CredentialTextInput = styled.TextInput`
  fontSize: 20;
  width: 90%;
`;

export default class FCredentialsForm extends React.PureComponent {
  render() {
    return (
      <CredentialTextInput
        placeholder={this.props.placeholder}
        secureTextEntry={this.props.secureTextEntry}
        selectionColor="darkslategrey"
        underlineColorAndroid="darkslategrey"
      />
    );
  }
}
