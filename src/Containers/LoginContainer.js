import React from 'react';
import { Text, View } from 'react-native';

import firebase from 'react-native-firebase';

export default class LoginContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      // firebase things?
    };
  }

  componentDidMount() {
    // firebase things?
  }

  render() {
    return (
      <View>
        <Text>
          Fiouse Financial Assistant
        </Text>
      </View>
    );
  }
}
