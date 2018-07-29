import React from 'react';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { RESTORE_USER } from '../constants/actions';

class PlaceholderContainer extends React.Component {
  componentWillMount() {
    this.reroute();
  }

  reroute = () => {
    AsyncStorage.getItem('user')
      .then(userData => {
        if (userData) {
          this.props.restoreUser(JSON.parse(userData));
          Actions.push('home');
        } else {
          Actions.push('accountAccess', { formType: 'login' });
        }
      }).catch(error => {
        console.log(error);
        Actions.push('accountAccess', { formType: 'login' });
      });
  }

  render() { return <View />; }
}

const mapDispatchToProps = dispatch => ({
  restoreUser: user => dispatch({
    type: RESTORE_USER,
    payload: { user },
  }),
});

PlaceholderContainer.propTypes = {
  restoreUser: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(PlaceholderContainer);
