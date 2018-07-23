import React from 'react';
import HomePresentation from '../Presentations/HomePresentation';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { LOGOUT_REQUEST } from '../constants/actions';

class HomeContainer extends React.Component {
  componentWillUpdate = (newProps) => {
    console.log(newProps.user, null);

    if (newProps.user === null) {
      Actions.push('accountAccess', { formType: 'login' });
    }
  };

  render() {
    return (
      <View>
        {this.props.user
          ? <HomePresentation
              user={this.props.user}
              onLogout={this.props.onLogout}
            />
          : <View />
        }
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch({
      type: LOGOUT_REQUEST,
    }),
  };
};

const mapStateToProps = state => {
  console.log(state);
  const { user } = state.auth;
  return { user };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);