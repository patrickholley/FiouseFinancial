import React from 'react';
import { Text, View } from 'react-native';

/* eslint-disable react/prefer-stateless-function */
export default class SettingsPresentation extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>
          {'Settings'}
        </Text>
      </View>
    );
  }
}
