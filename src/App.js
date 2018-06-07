import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';
import AccountAccessContainer from './Containers/AccountAccessContainer';

export default class App extends React.Component {
  render() {
    console.disableYellowBox = true;

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
        </Stack>
      </Router>
    );
  }
}
