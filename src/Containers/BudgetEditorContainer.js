import React from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BudgetEditorPresentation from '../Presentations/BudgetEditorPresentation';
import { LOGOUT_REQUEST } from '../constants/actions';

class BudgetEditorContainer extends React.Component {
  componentWillUpdate = (newProps) => {
    if (newProps.user === null) {
      Actions.push('login', { formType: 'login' });
    }
  };

  render() {
    return (
      <BudgetEditorPresentation
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

BudgetEditorContainer.propTypes = {
  onLogout: PropTypes.func.isRequired,
  user: PropTypes.object,
};

BudgetEditorContainer.defaultProps = {
  user: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(BudgetEditorContainer);
