import React from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components';
import { Actions } from 'react-native-router-flux';
import FButton from '../FiouseUI/FButton';
import FCredentialsForm from '../FiouseUI/FCredentialsForm';
import colors from '../constants/colors';

const AppNameText = styled.Text`
color: darkgoldenrod;
  fontSize: 24;
  fontWeight: bold;
  marginBottom: 20;
`;

const CopyrightText = styled.Text`
  margin: 10px;
`;

const FooterView = styled.View`
  flex: 1;
`;

const LoginView = styled.View`
  alignItems: center;
  display: flex;
  flex: 1;
`;

const LogoImage = styled.Image`
  borderRadius: 150;
  height: 150;
  margin: 10px;
`;

export default class LoginPresentation extends React.PureComponent {
  render() {
    return (
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <LoginView>
          <LogoImage
            source={require('../../assets/fiouse_logo.png')}
            resizeMode="center"
          />
          {/* Raleway font? */}
          <AppNameText>
            Financial Assistant
          </AppNameText>
          <FCredentialsForm submitText="Login" buttonStyles={{ width: '60%' }} />
          <FButton
            backgroundColor={colors[2]}
            textColor="white"
            text="Forgot your password?"
            buttonStyles={{
              marginBottom: 10,
              width: '60%',
            }}
            onPress={() => Actions.resetPassword()}
          />
          <FButton
            backgroundColor={colors[0]}
            textColor="white"
            text="Need an account?"
            buttonStyles={{
              width: '60%',
            }}
            onPress={() => Actions.newAccount()}
          />
          <FooterView />
          {/* Add Shaylee as Design Aid */}
          <CopyrightText>
            Copyright {'\u00A9'} 2018 Patrick Holley
          </CopyrightText>
        </LoginView>
      </ScrollView>
    );
  }
}
