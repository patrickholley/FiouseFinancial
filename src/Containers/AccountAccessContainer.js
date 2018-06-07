import React from 'react';
import { Alert, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import AccountAccessPresentation from '../Presentations/AccountAccessPresentation';
import allFormsValues from '../constants/allFormsValues';

export default class AccountAccessContainer extends React.Component {
  constructor() {
    super();

    const { formType } = Actions.currentParams;
    const formValues = allFormsValues[formType];
    Object.keys(formValues.fields).forEach(field => {
      formValues.fields[field].value = '';
    });

    this.state = {
      formType,
      formValues,
    };
  }

  onFieldChange(fieldId, ...args) {
    Alert.alert(fieldId, args[0]);
  }

  onFormSubmit(isFormValid) {
    Alert.alert(isFormValid);
  }

  render() {
    return (
      <AccountAccessPresentation
        formValues={this.state.formValues}
        isLoginForm={this.state.formType === 'login'}
        onFieldChange={this.onFieldChange}
        onFormSubmit={this.onFormSubmit}
        setContainerState={updatedState => { this.setState(updatedState); }}
      />
    );
  }
}
