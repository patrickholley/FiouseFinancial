import React from 'react';
import PropTypes from 'prop-types';
import { Animated, BackHandler } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import AccountAccessPresentation from '../Presentations/AccountAccessPresentation';
import allFormsValues from '../constants/allFormsValues';
import {
  NEW_ACCOUNT_REQUEST,
  CLEAR_CLIENT_ERROR,
  LOGIN_REQUEST,
  RESET_PASSWORD_REQUEST,
} from '../constants/actions';

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
      isNetworkActionInProgress: false,
    };
  }

  componentDidMount = () => {
    BackHandler.addEventListener('hardwareBackPress', this.onHardwareBackPress);
  }

  componentWillUpdate = (newProps) => {
    console.log(this);
    const {
      clearClientError,
      clientError,
      networkActionDone,
      user,
    } = newProps;

    if (user) Actions.push('home');

    if (networkActionDone) {
      this.postSubheader(clientError);
      clearClientError();
      this.setState({ isNetworkActionInProgress: false });
    }
  };

  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.onHardwareBackPress);
  }

  onHardwareBackPress = () => {
    if (Actions.currentParams.formType === 'login') {
      BackHandler.exitApp();
      return true;
    }

    return false;
  }

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
      this.postSubheader('Passwords must match');
    } else {
      this.setState({ isNetworkActionInProgress: true },
        () => { this.prepDispatchSubmit(fields); });
    }
  }

  onFormTypeChange = (formType) => {
    Actions.push(formType, this.actionParams[formType]);
  }

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
        onNetworkModalClose={() => {}}
        setContainerState={updatedState => { this.setState(updatedState); }}
        isNetworkActionInProgress={this.state.isNetworkActionInProgress}
      />
    );
  }
}

const mapStateToProps = state => {
  const {
    clearClientError,
    clientError,
    networkActionDone,
    user,
  } = state.auth;

  return {
    clearClientError,
    clientError,
    networkActionDone,
    user,
  };
};

const mapDispatchToProps = dispatch => (
  {
    clearClientError: () => dispatch({
      type: CLEAR_CLIENT_ERROR,
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
