import React from 'react';
import PropTypes from 'prop-types';
import { Animated, BackHandler } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import AccountAccessPresentation from '../Presentations/AccountAccessPresentation';
import allFormsValues from '../constants/allFormsValues';
import {
  NEW_ACCOUNT_REQUEST,
  CLEAR_NETWORK_ACTION,
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

    const formType = Actions.currentScene;

    this.state = {
      canSubmit: false,
      fadeAnim: new Animated.Value(1),
      formType,
      formValues: allFormsValues.get(formType)
        .set(
          'fields',
          allFormsValues.getIn([formType, 'fields'])
            .map(field => field.set('value', '')),
        ),
      isNetworkActionInProgress: false,
      showResetPasswordModal: false,
    };
  }

  componentDidMount = () => {
    BackHandler.addEventListener('hardwareBackPress', this.onHardwareBackPress);
  }

  componentWillUpdate = (newProps) => {
    const {
      clearNetworkAction,
      clientError,
      networkActionDone,
      showResetPasswordModal,
      user,
    } = newProps;

    if (this.state.formType === Actions.currentScene && networkActionDone) {
      if (clientError) this.postSubheader(clientError);

      const updatedState = {
        isNetworkActionInProgress: false,
        showResetPasswordModal: showResetPasswordModal || this.state.showResetPasswordModal,
      };

      clearNetworkAction();
      this.setState(updatedState);
    }

    if (user) Actions.replace('budgetList');
  };

  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.onHardwareBackPress);
  }

  onHardwareBackPress = () => {
    if (this.state.showResetPasswordModal) {
      this.setState({ showResetPasswordModal: false });
      return true;
    }

    if (Actions.currentScene === 'login') {
      BackHandler.exitApp();
      return true;
    }

    return false;
  }

  onFieldChange = (fieldId, updatedValue) => {
    this.setState(oldState => {
      const formValues = oldState.formValues
        .setIn(['fields', fieldId, 'value'], updatedValue);

      return {
        canSubmit: formValues.get('fields').every(field => field.get('value') !== ''),
        formValues,
      };
    });
  }

  onFormSubmit = () => {
    const { formType, formValues } = this.state;
    const fields = formValues.get('fields');

    if (formType === 'createAccount'
      && fields.getIn(['password', 'value']) !== fields.getIn(['confirmPassword', 'value'])) {
      this.postSubheader('Passwords must match');
    } else {
      this.setState({ isNetworkActionInProgress: true },
        () => { this.prepDispatchSubmit(fields); });
    }
  }

  onFormTypeChange = (formType) => {
    Actions.push(formType, this.actionParams[formType]);
  }

  postSubheader = (subheaderText, isError = true) => {
    this.setState(oldState => ({
      fadeAnim: new Animated.Value(0),
      formValues: oldState.formValues.merge({ error: isError, subheaderText }),
    }), () => {
      Animated.timing(
        this.state.fadeAnim,
        { toValue: 1, duration: 1000 },
      ).start();
    });
  };

  prepDispatchSubmit = fields => {
    let submitAction;

    switch (this.state.formType) {
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
        onResetPasswordModalBack={this.onHardwareBackPress}
        setContainerState={updatedState => { this.setState(updatedState); }}
        isNetworkActionInProgress={this.state.isNetworkActionInProgress}
        showResetPasswordModal={this.state.showResetPasswordModal}
      />
    );
  }
}

const mapStateToProps = state => {
  const { auth } = state;

  return {
    clientError: auth.get('clientError'),
    networkActionDone: auth.get('networkActionDone'),
    showResetPasswordModal: auth.get('showResetPasswordModal'),
    user: auth.get('user'),
  };
};

const mapDispatchToProps = dispatch => (
  {
    clearNetworkAction: () => dispatch({
      type: CLEAR_NETWORK_ACTION,
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
