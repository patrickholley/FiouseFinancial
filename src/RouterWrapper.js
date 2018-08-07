import React from 'react';
import {
  Router,
  Scene,
  Stack,
  Drawer,
} from 'react-native-router-flux';
import AccountAccessContainer from './Containers/AccountAccessContainer';
import ManageBudgetsContainer from './Containers/ManageBudgetsContainer';
import PlaceholderContainer from './Containers/PlaceholderContainer';
import SettingsContainer from './Containers/SettingsContainer';
import NavigationDrawerContainer from './Containers/NavigationDrawerContainer';
import colors from './constants/colors';

const styles = {
  navDrawerLeftButton: {
    backgroundColor: colors[0],
    display: 'flex',
    justifyContent: 'center',
  },
  navDrawerLeftButtonText: {
    color: 'white',
    fontSize: 24,
  },
  navDrawerTitle: {
    color: colors[2],
  },
  navDrawerNavigationBar: {
    paddingLeft: 15,
  },
};

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

          <Drawer
            hideNavBar
            key="navigationDrawer"
            leftButtonStyle={styles.navDrawerLeftButton}
            leftTitle="&#9776;"
            leftButtonTextStyle={styles.navDrawerLeftButtonText}
            navigationBarStyle={styles.navDrawerNavigationBar}
            contentComponent={NavigationDrawerContainer}
            title="Navigation Drawer"
            titleStyle={styles.navDrawerTitle}
          >
            <Scene
              key="manageBudgets"
              component={ManageBudgetsContainer}
              title="Manage Budgets"
            />
            <Scene
              key="settings"
              component={SettingsContainer}
              title="Settings"
            />
          </Drawer>
        </Stack>
      </Router>
    );
  }
}
