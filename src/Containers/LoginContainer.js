import React from 'react';
import { Text, View } from 'react-native';
import LoginPresentation from '../Presentations/LoginPresentation';

import firebase from 'react-native-firebase';

export default class LoginContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      // firebase things?
    };
  }

  render() {
    return (
      <LoginPresentation />
    );
  }
}
