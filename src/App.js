import React from 'react';
import { Text, View } from 'react-native';
import { Router, Scene, Stack } from 'react-native-router-flux';
import LoginContainer from './Containers/LoginContainer';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene key="login" component={LoginContainer} title="Login" />
        </Stack>
      </Router>
    );
  }
}
