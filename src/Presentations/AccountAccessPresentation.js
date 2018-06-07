import React from 'react';
import { ScrollView, View } from 'react-native';
import styled from 'styled-components';
import { Actions } from 'react-native-router-flux';
import FButton from '../FiouseUI/FButton';
import FForm from '../FiouseUI/FForm';
import colors from '../constants/colors';

const AccountAccessView = styled.View`
  alignItems: center;
  display: flex;
  flex: 1;
  textAlign: center;
`;

const CopyrightText = styled.Text`
  margin: 10px;
`;

const FooterView = styled.View`
  flex: 1;
`;

const HeaderText = styled.Text`
  color: ${colors[0]};
  fontSize: 24;
  fontWeight: bold;
`;

const LargeLogoImage = styled.Image`
  borderRadius: 150;
  height: 150;
  margin: 10px;
`;

const SmallLogoImage = styled.Image`
  borderRadius: 100;
  height: 100;
  margin: 10px;
`;

const SubheaderText = styled.Text`
  color: ${colors[2]};
  fontSize: 16;
  fontStyle: italic;
  textAlign: center;
  marginBottom: 20px;
`;

export default class AccountAccessPresentation extends React.PureComponent {
  formValues = {
    login: {
      fields: [
        { placeholder: 'Email', keyboardType: 'email-address' },
        { placeholder: 'Password', isSecure: true },
      ],
      headerText: 'Financial Assistant',
      submitText: 'Login',
    },
    resetPassword: {
      fields: [
        { placeholder: 'Email', keyboardType: 'email-address' },
      ],
      headerText: 'Reset Password',
      subheaderText: 'Please enter the email address associated with your account below.',
      submitText: 'Submit',
    },
    createAccount: {
      fields: [
        { placeholder: 'Email', keyboardType: 'email-address' },
        { placeholder: 'Confirm Email', keyboardType: 'email-address' },
        { placeholder: 'Password', isSecure: true },
        { placeholder: 'Confirm Password', isSecure: true },
      ],
      headerText: 'Create New Account',
      subheaderText: 'Your email address will be used for authentication, technical support, and password recovery only',
      submitText: 'Submit',
    },
  };

  render() {
    const resetPasswordParams = {
      formType: 'resetPassword',
      hideNavBar: false,
      title: 'Reset Password',
    };
    const createAccountParams = {
      formType: 'createAccount',
      hideNavBar: false,
      title: 'Create New Account',
    };
    const { formType } = this.props;
    const isLoginForm = formType === 'login';

    return (
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <AccountAccessView>
          {isLoginForm
            ? <LargeLogoImage
                source={require('../../assets/fiouse_logo.png')}
                resizeMode="center"
              />
            : <SmallLogoImage
                source={require('../../assets/fiouse_logo.png')}
                resizeMode="center"
              />}
          <HeaderText>
            {this.formValues[formType].headerText}
          </HeaderText>
          {!isLoginForm
            ? <SubheaderText>
                {this.formValues[formType].subheaderText}
              </SubheaderText>
            : <View />}
          <FForm
            fields={this.formValues[formType].fields}
            submitText={this.formValues[formType].submitText}
            buttonStyles={{ width: '60%' }}
          />
          {isLoginForm ? [
            <FButton
              backgroundColor={colors[2]}
              textColor="white"
              text="Forgot your password?"
              buttonStyles={{
                marginBottom: 10,
                width: '60%',
              }}
              onPress={() => Actions.accountAccess(resetPasswordParams)}
            />,
            <FButton
              backgroundColor={colors[0]}
              textColor="white"
              text="Need an account?"
              buttonStyles={{
                width: '60%',
              }}
              onPress={() => Actions.accountAccess(createAccountParams)}
            />
          ] : <View />}
          <FooterView />
          <CopyrightText>
            Copyright {'\u00A9'} 2018 Fiouse
          </CopyrightText>
        </AccountAccessView>
      </ScrollView>
    );
  }
}