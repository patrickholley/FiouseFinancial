import React from 'react';
import { View } from 'react-native';
import FCredentialsForm from '../FiouseUI/FCredentialsForm';

export default class LoginPresentation extends React.PureComponent {
  render() {
    return (
      <View>
        <FCredentialsForm
          confirmPassword
          requireEmail
          submitText="Create new account"
        />
      </View>
    );
  }
}
