import React from 'react';
import { Animated } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import AccountAccessPresentation from '../Presentations/AccountAccessPresentation';
import allFormsValues from '../constants/allFormsValues';
import {
  CREATE_ACCOUNT_REQUEST,
  CLEAR_AUTH_ERROR,
  LOGIN_REQUEST,
  RESET_PASSWORD_REQUEST,
} from '../constants/actions';
import userFriendlyErrors from '../constants/userFriendlyErrors';

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
    const { authError } = newProps;

    if (newProps.user) {
      Actions.push('home');
    }

    if (authError) {
      let errorMessage;
      errorMessage = authError.code
      ? userFriendlyErrors[authError.code]
      : 'Something went wrong.';

      this.postSubheader(errorMessage, true);
      this.props.clearAuthError();
    }
  };

  postSubheader = (subheaderText, isError) => {
    const { formValues } = this.state;
    formValues.error = isError;
    formValues.subheaderText = subheaderText;
    this.setState({ fadeAnim: new Animated.Value(0), formValues, }, () => {
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

    if (emptyFields.length > 0) this.postSubheader('Please fill all fields', true);
    else this.props.onDispatchSubmit(fields);
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
  const { authError, user } = state.auth;
  return { authError, user };
};

const mapDispatchToProps = dispatch => {
  let submitAction;

  switch(Actions.currentParams.formType) {
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

  console.log(Actions.currentParams.formType, submitAction);

  return {
    clearAuthError: () => dispatch({
      type: CLEAR_AUTH_ERROR,
    }),
    onDispatchSubmit: fields => dispatch({
      type: submitAction,
      payload: { fields },
    }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountAccessContainer);
