import React from 'react';
import styled from 'styled-components';

const CredentialsTextInput = styled.TextInput`
  fontSize: 20;
  width: 90%;
`;

export default class FCredentialsField extends React.PureComponent {
  render() {
    return (
      <CredentialsTextInput
        placeholder={this.props.placeholder}
        secureTextEntry={this.props.secureTextEntry}
        selectionColor="darkslategrey"
        underlineColorAndroid="darkslategrey"
      />
    );
  }
}
