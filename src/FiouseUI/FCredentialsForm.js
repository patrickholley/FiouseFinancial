import React from 'react';
import FButton from './FButton';
import FCredentialsField from './FCredentialsField';
import FWrapper from './FWrapper';
import colors from '../constants/colors';

const defaultStyles = {
  button: {
    margin: 20,
    width: '80%',
    height: 54,
  },
  buttonText: {
    fontSize: 24,
  }
}

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
          backgroundColor={colors[3]}
          textColor="white"
          text={this.props.submitText.toUpperCase()}
          buttonStyles={Object.assign(
            defaultStyles.button,
            this.props.buttonStyles
          )}
          textStyles={Object.assign(
            defaultStyles.buttonText,
            this.props.buttonTextStyles
          )}
        />
      </FWrapper>
    );
  }
}
