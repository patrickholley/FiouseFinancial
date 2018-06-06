import React from 'react';
import { Image, Text, TextInput, TouchableOpacity, ScrollView, View } from 'react-native';
import styled from 'styled-components';
import { Actions } from 'react-native-router-flux';

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
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View
          style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
          }}
        >
          <Image
            source={require('../../assets/fiouse-short.jpg')}
            resizeMode="center"
            style={{
              height: 150,
              margin: 10,
              borderRadius: 150,
            }}
          />
          <Text
            style={{
              fontSize: 24,
              color: 'darkgoldenrod',
              fontWeight: 'bold',
              marginBottom: 20,
            }}
          >
            Financial Assistant
          </Text>
          <TextInput
            placeholder="Username"
            selectionColor="darkslategrey"
            style={styles.input}
            underlineColorAndroid="darkslategrey"
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            selectionColor="darkslategrey"
            style={styles.input}
            underlineColorAndroid="darkslategrey"
          />
          <FButton
            backgroundColor="darkgoldenrod"
            textColor="white"
            text="Login"
            buttonStyles={{
              margin: 20,
              width: '60%',
              height: 54
            }}
            textStyles={{
              fontSize: 24
            }}
          />
          <FButton
            backgroundColor="darkgreen"
            textColor="white"
            text="Forgot your password?"
            buttonStyles={{
              marginBottom: 10,
              width: '60%',
            }}
          />
          <FButton
            backgroundColor="darkslategrey"
            textColor="white"
            text="Need an account?"
            buttonStyles={{
              width: '60%',
            }}
            onPress={() => Actions.newAccount()}
          />
          <View style={{ flex: 1 }} />
          <Text
            style={{
              margin: 10,
            }}
          >
            Copyright {'\u00A9'} 2018 Patrick Holley
          </Text>
        </View>
      </ScrollView>
    );
  }
}
