import React from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SettingsPresentation from '../Presentations/SettingsPresentation';
import { LOGOUT_REQUEST } from '../constants/actions';

class SettingsContainer extends React.Component {
  componentWillUpdate = (newProps) => {
    if (newProps.user === null) {
      Actions.push('login', { formType: 'login' });
    }
  };

  render() {
    return (
      <SettingsPresentation
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

SettingsContainer.propTypes = {
  onLogout: PropTypes.func.isRequired,
  user: PropTypes.object,
};

SettingsContainer.defaultProps = {
  user: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);
