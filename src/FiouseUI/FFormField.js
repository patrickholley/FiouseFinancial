import React from 'react';
import styled from 'styled-components';

const FieldTextInput = styled.TextInput`
  fontSize: 20;
  width: 90%;
`;

export default class FFormField extends React.PureComponent {
  render() {
    return (
      <FieldTextInput
        placeholder={this.props.placeholder}
        secureTextEntry={this.props.secureTextEntry}
        selectionColor="darkslategrey"
        underlineColorAndroid="darkslategrey"
      />
    );
  }
}
