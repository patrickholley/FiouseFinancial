import React from 'react';
import FButton from './FButton';
import FCredentialsField from './FCredentialsField';
import FWrapper from './FWrapper';

export default class FCredentialsForm extends React.PureComponent {
  render() {
    return (
      <FWrapper>
        <FCredentialsField placeholder="Username" />
        {this.props.requireEmail && <FCredentialsField placeholder="Email Address" />}
        {!this.props.noPassword && <FCredentialsField placeholder="Password" secureTextEntry />}
        {!this.props.noPassword
          && this.props.confirmPassword
          && <FCredentialsField placeholder="Confirm Password" secureTextEntry />}
        <FButton
          backgroundColor="darkgoldenrod"
          textColor="white"
          text={this.props.submitText.toUpperCase()}
          buttonStyles={{
            margin: 20,
            width: '60%',
            height: 54
          }}
          textStyles={{
            fontSize: 24
          }}
        />
      </FWrapper>
    );
  }
}
