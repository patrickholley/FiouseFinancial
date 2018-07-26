import React from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HomePresentation from '../Presentations/HomePresentation';
import { LOGOUT_REQUEST } from '../constants/actions';

class HomeContainer extends React.Component {
  componentWillUpdate = (newProps) => {
    if (newProps.user === null) {
      Actions.push('accountAccess', { formType: 'login' });
    }
  };

  render() {
    return (
      <HomePresentation
        user={this.props.user}
        onLogout={this.props.onLogout}
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

HomeContainer.propTypes = {
  onLogout: PropTypes.func.isRequired,
  user: PropTypes.object,
};

HomeContainer.defaultProps = {
  user: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
