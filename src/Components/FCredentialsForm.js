import React from 'react';
import { TextInput, View } from 'react-native';
import styled from 'styled-components';

import FCredentialsField from './FCredentialsField';
import FWrapper from './FWrapper';

const CredentialTextInput = styled.TextInput`
  fontSize: 20;
  width: 90%;
`;

export default class FCredentialsForm extends React.PureComponent {
  render() {
    return (
      <FWrapper>
        <FCredentialsField placeholder="Username" />
        <FCredentialsField placeholder="Password" secureTextEntry />
        {this.props.newAccount && <FCredentialsField placeholder="Confirm Password" secureTextEntry />}
      </FWrapper>
    );
  }
}
