import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { FButton } from '../FiouseUI';
import colors from '../constants/colors';

/* eslint-disable react/prefer-stateless-function */
export default class HomePresentation extends React.Component {
  render() {
    return (
      <View>
        <Text>
          {this.props.user ? `User: ${this.props.user.email}` : 'Signing out . . .'}
        </Text>
        <FButton
          backgroundColor={colors[0]}
          key="signOut"
          textColor="white"
          text="Logout"
          buttonStyles={{
            width: '60%',
          }}
          onPress={this.props.onLogout}
        />
      </View>
    );
  }
}

HomePresentation.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func.isRequired,
};

HomePresentation.defaultProps = {
  user: null,
};
