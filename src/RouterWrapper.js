import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';
import AccountAccessContainer from './Containers/AccountAccessContainer';
import HomeContainer from './Containers/HomeContainer';
import PlaceholderContainer from './Containers/PlaceholderContainer';

/* eslint-disable react/prefer-stateless-function */
export default class RouterWrapper extends React.Component {
  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene
            hideNavBar
            key="placeholder"
            component={PlaceholderContainer}
          />
          <Scene
            hideNavBar
            key="login"
            component={AccountAccessContainer}
            title="Login"
          />
          <Scene
            key="createAccount"
            component={AccountAccessContainer}
            title="Create Account"
          />
          <Scene
            key="resetPassword"
            component={AccountAccessContainer}
            title="Reset Password"
          />
          <Scene
            hideNavBar
            key="home"
            component={HomeContainer}
            title="Home"
          />
        </Stack>
      </Router>
    );
  }
}
