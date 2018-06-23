import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';
import AccountAccessContainer from './Containers/AccountAccessContainer';
import HomeContainer from './Containers/HomeContainer';

export default class RouterWrapper extends React.Component {
  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene
            hideNavBar
            key="accountAccess"
            formType="login"
            component={AccountAccessContainer}
            title="Login"
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
