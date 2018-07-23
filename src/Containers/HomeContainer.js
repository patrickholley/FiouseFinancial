import React from 'react';
import HomePresentation from '../Presentations/HomePresentation';
import { connect } from 'react-redux';

class HomeContainer extends React.Component {
  render() {
    return (
      <HomePresentation
        user={this.props.user}
      />
    );
  }
}

/* const mapDispatchToProps = dispatch => {
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
}; */

const mapStateToProps = state => {
  console.log(state);
  const { user } = state.auth;
  return { user };
};

export default connect(mapStateToProps)(HomeContainer);