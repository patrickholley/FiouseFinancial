import React from 'react';
import { Image, Text, TextInput, TouchableOpacity, ScrollView, View } from 'react-native';
import styled from 'styled-components';

import FButton from '../Components/FButton';
import colors from '../constants/colors';

export default class LoginPresentation extends React.PureComponent {
  render() {
    const styles = {
      input: {
        fontSize: 20,
        width: '90%',
      },
    };

    return (
      <View>
        <Text>
          New Account Page
        </Text>
      </View>
    );
  }
}
