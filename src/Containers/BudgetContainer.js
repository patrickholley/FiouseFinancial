import React from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import BudgetPresentation from '../Presentations/BudgetPresentation';
import { LOGOUT_REQUEST } from '../constants/actions';

class BudgetContainer extends React.Component {
  componentWillUpdate = (newProps) => {
    if (newProps.user === null) {
      Actions.push('login', { formType: 'login' });
    }
  };

  render() {
    return (
      <BudgetPresentation />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch({
    type: LOGOUT_REQUEST,
  }),
});

const mapStateToProps = state => {
  const { user } = state.auth;
  return { user };
};

export default connect(mapStateToProps, mapDispatchToProps)(BudgetContainer);
