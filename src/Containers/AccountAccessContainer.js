import React from 'react';
import { Animated } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import axios from 'axios';
import AccountAccessPresentation from '../Presentations/AccountAccessPresentation';
import allFormsValues from '../constants/allFormsValues';
import { LOGIN_REQUEST } from '../constants/actions';

class AccountAccessContainer extends React.Component {
  constructor() {
    super();

    const { formType } = Actions.currentParams;
    const formValues = Object.assign({}, allFormsValues[formType]);
    Object.keys(formValues.fields).forEach(fieldId => {
      formValues.fields[fieldId].value = '';
    });

    this.state = {
      fadeAnim: new Animated.Value(1),
      formType,
      formValues,
    };
  }

  componentWillUpdate = (newProps) => {
    console.log(newProps.user);
  };

  postSubheader = (subheaderText) => {
    const { formValues } = this.state;
    formValues.error = true;
    formValues.subheaderText = subheaderText;
    this.setState({ fadeAnim: new Animated.Value(0), formValues }, () => {
      Animated.timing(
        this.state.fadeAnim,
        { toValue: 1, duration: 1000 },
      ).start();
    });
  };

  onFieldChange = (fieldId, updatedValue) => {
    const { formValues } = this.state;
    formValues.fields[fieldId].value = updatedValue;
    this.setState({ formValues });
  }

  onFormSubmit = () => {
    const { fields } = this.state.formValues;
    const emptyFields = Object.keys(fields).filter(fieldId => fields[fieldId].value === '');

    if (emptyFields.length > 0) this.postSubheader('Please fill all fields');
    else this.props.onLogin(fields.email.value, fields.password.value);
  }

  render() {
    return (
      <AccountAccessPresentation
        fadeAnim={this.state.fadeAnim}
        formError={this.state.formError}
        formValues={this.state.formValues}
        isLoginForm={this.state.formType === 'login'}
        onFieldChange={this.onFieldChange}
        onFormSubmit={this.onFormSubmit}
        setContainerState={updatedState => { this.setState(updatedState); }}
      />
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.auth;
  return { user };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (email, password) => dispatch({
      type: LOGIN_REQUEST,
      payload: { email, password },
    }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountAccessContainer);
