import React from 'react';
import { Text, View } from 'react-native';
import { Router, Scene, Stack } from 'react-native-router-flux';
import LoginContainer from './Containers/LoginContainer';
import NewAccountContainer from './Containers/NewAccountContainer';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene hideNavBar key="login" component={LoginContainer} title="Login" />
          <Scene key="newAccount" component={NewAccountContainer} title="New Account" />
        </Stack>
      </Router>
    );
  }
}
