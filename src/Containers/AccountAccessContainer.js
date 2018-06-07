import React from 'react';
import { Actions } from 'react-native-router-flux';
import AccountAccessPresentation from '../Presentations/AccountAccessPresentation';

export default class AccountAccessContainer extends React.Component {
  render() {
    return (
      <AccountAccessPresentation
        formType={Actions.currentParams.formType}
        setContainerState={updatedState => { this.setState(updatedState); }}
      />
    );
  }
}
