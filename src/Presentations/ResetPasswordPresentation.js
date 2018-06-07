import React from 'react';
import { View } from 'react-native';
import FCredentialsForm from '../FiouseUI/FCredentialsForm';

export default class ResetPasswordPresentation extends React.PureComponent {
  render() {
    return (
      <View>
        <FCredentialsForm
          noPassword
          submitText="Reset Password"
          buttonStyles={{width: '100%'}}
        />
      </View>
    );
  }
}
