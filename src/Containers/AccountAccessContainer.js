import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import AccountAccessPresentation from '../Presentations/AccountAccessPresentation';
import allFormsValues from '../constants/allFormsValues';
import {
  NEW_ACCOUNT_REQUEST,
  CLEAR_AUTH_ERROR,
  LOGIN_REQUEST,
  RESET_PASSWORD_REQUEST,
} from '../constants/actions';
import userFriendlyErrors from '../constants/userFriendlyErrors';

class AccountAccessContainer extends React.Component {
  actionParams = {
    createAccount: {
      formType: 'createAccount',
      hideNavBar: false,
      title: 'Create New Account',
    },
    resetPassword: {
      formType: 'resetPassword',
      hideNavBar: false,
      title: 'Reset Password',
    },
  };

  constructor() {
    super();

    const { formType } = Actions.currentParams;
    const formValues = Object.assign({}, allFormsValues[formType]);
    Object.keys(formValues.fields).forEach(fieldId => {
      formValues.fields[fieldId].value = '';
    });

    this.state = {
      canSubmit: false,
      fadeAnim: new Animated.Value(1),
      formType,
      formValues,
    };
  }

  componentWillUpdate = (newProps) => {
    const { authError, clearAuthError } = newProps;

    if (newProps.user) {
      Actions.push('home');
    }

    if (authError) {
      const errorMessage = authError.code
        ? userFriendlyErrors[authError.code]
        : 'Something went wrong';

      this.postSubheader(errorMessage, true);
      clearAuthError();
    }
  };

  onFieldChange = (fieldId, updatedValue) => {
    const { formValues } = this.state;
    const { fields } = formValues;
    fields[fieldId].value = updatedValue;
    this.setState({
      canSubmit: Object.keys(fields).every(fId => fields[fId].value !== ''),
      formValues,
    });
  }

  onFormSubmit = () => {
    const { fields } = this.state.formValues;
    const { formType } = Actions.currentParams;

    if (formType === 'createAccount'
      && fields.password.value !== fields.confirmPassword.value) {
      this.postSubheader('Passwords must match', true);
    } else this.prepDispatchSubmit(fields);
  }

  onFormTypeChange = (formType) => { Actions.push(formType, this.actionParams[formType]); }

  postSubheader = (subheaderText, isError) => {
    const { formValues } = this.state;
    formValues.error = isError;
    formValues.subheaderText = subheaderText;
    this.setState({ fadeAnim: new Animated.Value(0), formValues }, () => {
      Animated.timing(
        this.state.fadeAnim,
        { toValue: 1, duration: 1000 },
      ).start();
    });
  };

  prepDispatchSubmit = fields => {
    let submitAction;

    switch (Actions.currentParams.formType) {
      case 'createAccount':
        submitAction = NEW_ACCOUNT_REQUEST;
        break;
      case 'resetPassword':
        submitAction = RESET_PASSWORD_REQUEST;
        break;
      case 'login':
        submitAction = LOGIN_REQUEST;
        break;
      default:
        submitAction = null;
        break;
    }

    this.props.onDispatchSubmit(submitAction, fields);
  };

  render() {
    return (
      <AccountAccessPresentation
        canSubmit={this.state.canSubmit}
        fadeAnim={this.state.fadeAnim}
        formError={this.state.formError}
        formValues={this.state.formValues}
        isLoginForm={this.state.formType === 'login'}
        onFieldChange={this.onFieldChange}
        onFormSubmit={this.onFormSubmit}
        onFormTypeChange={this.onFormTypeChange}
        setContainerState={updatedState => { this.setState(updatedState); }}
      />
    );
  }
}

const mapStateToProps = state => {
  const { authError, user } = state.auth;
  return { authError, user };
};

const mapDispatchToProps = dispatch => (
  {
    clearAuthError: () => dispatch({
      type: CLEAR_AUTH_ERROR,
    }),
    onDispatchSubmit: (submitAction, fields) => dispatch({
      type: submitAction,
      payload: { fields },
    }),
  }
);

AccountAccessContainer.propTypes = {
  onDispatchSubmit: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountAccessContainer);
