import React from 'react';
import { Image, Text, TextInput, TouchableOpacity, ScrollView, View } from 'react-native';
import styled from 'styled-components';
import { Actions } from 'react-native-router-flux';

import FButton from '../Components/FButton';
import colors from '../constants/colors';

const AppNameText = styled.Text`
  fontSize: 24;
  color: darkgoldenrod;
  fontWeight: bold;
  marginBottom: 20;
`;

const CopyrightText = styled.Text`
  margin: 10px;
`;

const CredentialTextInput = styled.TextInput`
  fontSize: 20;
  width: 90%;
`;

const FooterView = styled.View`
  flex: 1;
`;

const LoginView = styled.View`
  display: flex;
  flex: 1;
  alignItems: center;
`;

const LogoImage = styled.Image`
  height: 150;
  margin: 10px;
  borderRadius: 150;
`;

export default class LoginPresentation extends React.PureComponent {
  render() {
    return (
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <LoginView>
          <LogoImage
            source={require('../../assets/fiouse-short.jpg')}
            resizeMode="center"
          />
          <AppNameText>
            Financial Assistant
          </AppNameText>
          <CredentialTextInput
            placeholder="Username"
            selectionColor="darkslategrey"
            underlineColorAndroid="darkslategrey"
          />
          <CredentialTextInput
            placeholder="Password"
            secureTextEntry
            selectionColor="darkslategrey"
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
          <FooterView />
          <CopyrightText>
            Copyright {'\u00A9'} 2018 Patrick Holley
          </CopyrightText>
        </LoginView>
      </ScrollView>
    );
  }
}
