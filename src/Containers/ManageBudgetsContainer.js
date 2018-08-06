import React from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ManageBudgetsPresentation from '../Presentations/ManageBudgetsPresentation';
import { LOGOUT_REQUEST } from '../constants/actions';

class ManageBudgetsContainer extends React.Component {
  componentWillUpdate = (newProps) => {
    if (newProps.user === null) {
      Actions.push('login', { formType: 'login' });
    }
  };

  render() {
    return (
      <ManageBudgetsPresentation
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

ManageBudgetsContainer.propTypes = {
  onLogout: PropTypes.func.isRequired,
  user: PropTypes.object,
};

ManageBudgetsContainer.defaultProps = {
  user: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageBudgetsContainer);
