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
    Object.keys(formValues.fields).forEach(fieldId => {
      formValues.fields[fieldId].value = '';
    });

    this.state = {
      formType,
      formValues,
    };
  }

  onFieldChange = (fieldId, updatedValue) => {
    const { formValues } = this.state;
    formValues.fields[fieldId].value = updatedValue;
    this.setState({ formValues });
  }

  onFormSubmit = () => {
    const { fields } = this.state.formValues;
    const isFormValid = Object.keys(fields).every(fieldId => fields[fieldId].value !== '');
    Alert.alert(`${isFormValid}`);
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
