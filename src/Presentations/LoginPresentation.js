import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';

import Button from '../Components/Button';

export default class LoginPresentation extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      // firebase things?
    };
  }

  render() {
    return (
      <View>
        <TextInput placeholder="Username" />
        <TextInput placeholder="Password" />
        <Button backgroundColor="darkgreen" color="white" text="Need an account?" />
      </View>
    );
  }
}
