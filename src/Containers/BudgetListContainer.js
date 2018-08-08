import React from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BudgetListPresentation from '../Presentations/BudgetListPresentation';
import { LOGOUT_REQUEST } from '../constants/actions';

class BudgetListContainer extends React.Component {
  componentWillUpdate = (newProps) => {
    if (newProps.user === null) {
      Actions.push('login', { formType: 'login' });
    }
  };

  render() {
    return (
      <BudgetListPresentation
      />
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

BudgetListContainer.propTypes = {
  onLogout: PropTypes.func.isRequired,
  user: PropTypes.object,
};

BudgetListContainer.defaultProps = {
  user: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(BudgetListContainer);
