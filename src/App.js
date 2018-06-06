import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';
import ResetPasswordContainer from './Containers/ResetPasswordContainer';
import LoginContainer from './Containers/LoginContainer';
import NewAccountContainer from './Containers/NewAccountContainer';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene hideNavBar key="login" component={LoginContainer} title="Login" />
          <Scene key="newAccount" component={NewAccountContainer} title="Create New Account" />
          <Scene key="resetPassword" component={ResetPasswordContainer} title="Reset Password" />
        </Stack>
      </Router>
    );
  }
}
