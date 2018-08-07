import React from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavigationDrawerPresentation from '../Presentations/NavigationDrawerPresentation';
import { LOGOUT_REQUEST } from '../constants/actions';

class NavigationDrawerContainer extends React.Component {
  componentWillUpdate = (newProps) => {
    if (newProps.user === null) {
      Actions.push('login', { formType: 'login' });
    }
  };

  render() {
    return (
      <NavigationDrawerPresentation
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

NavigationDrawerContainer.propTypes = {
  onLogout: PropTypes.func.isRequired,
  user: PropTypes.object,
};

NavigationDrawerContainer.defaultProps = {
  user: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationDrawerContainer);
