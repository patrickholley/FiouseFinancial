import React from 'react';
import { ScrollView, View } from 'react-native';
import styled from 'styled-components';
import { Actions } from 'react-native-router-flux';
import FButton from '../FiouseUI/FButton';
import FForm from '../FiouseUI/FForm';
import colors from '../constants/colors';

const HeaderText = styled.Text`
color: darkgoldenrod;
  fontSize: 24;
  fontWeight: bold;
  marginBottom: 20;
`;

const CopyrightText = styled.Text`
  margin: 10px;
  textAlign: center;
`;

const FooterView = styled.View`
  flex: 1;
`;

const AccountAccessView = styled.View`
  alignItems: center;
  display: flex;
  flex: 1;
`;

const LogoImage = styled.Image`
  borderRadius: 150;
  height: 150;
  margin: 10px;
`;

export default class AccountAccessPresentation extends React.PureComponent {
  formValues = {
    login: {
      fields: ['Email', 'Password'],
      headerText: 'Financial Assistant',
      submitText: 'Login',
    },
    resetPassword: {
      fields: ['Email'],
      headerText: 'Reset Password',
      submitText: 'Submit',
    },
    createAccount: {
      fields: ['Email', 'Confirm Email', 'Password', 'Confirm Password'],
      headerText: 'Create New Account',
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
    const isFormType = formType === 'login';

    return (
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <AccountAccessView>
          {isFormType
            ? <LogoImage
                source={require('../../assets/fiouse_logo.png')}
                resizeMode="center"
              />
            : <View />}
          <HeaderText>
            {this.formValues[formType].headerText}
          </HeaderText>
          <FForm
            fields={this.formValues[formType].fields}
            submitText={this.formValues[formType].submitText}
            buttonStyles={{ width: '60%' }}
          />
          {(() => {
            if (isFormType) {
              return [
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
              ];
            }
          })()}
          <FooterView />
          <CopyrightText>
            Copyright {'\u00A9'} 2018 Fiouse
          </CopyrightText>
        </AccountAccessView>
      </ScrollView>
    );
  }
}
