import React from 'react';
import { Text, View } from 'react-native';
import FButton from '../FiouseUI/FButton';
import colors from '../constants/colors';

export default class HomePresentation extends React.Component {
  render() {
    return (
      <View>
        <Text>User: {this.props.user.user.email}</Text>
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
