import React from 'react';
import { Animated, ScrollView, View } from 'react-native';
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

const SubheaderAnimatedText = Animated.createAnimatedComponent(styled.Text`
  color: ${props => props.error ? 'red' : colors[2]};
  fontSize: 16;
  fontStyle: italic;
  height: 40px;
  textAlign: center;
`);

export default class AccountAccessPresentation extends React.PureComponent {

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

    const { formValues, isLoginForm, onFieldChange, onFormSubmit } = this.props;

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
            {formValues.headerText}
          </HeaderText>
          <SubheaderAnimatedText
            error={formValues.error}
            style={{ opacity: this.props.fadeAnim }}
          >
            {formValues.subheaderText}
          </SubheaderAnimatedText>
          <FForm
            fields={formValues.fields}
            onFieldChange={onFieldChange}
            onFormSubmit={onFormSubmit}
            submitText={formValues.submitText}
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
              onPress={() => Actions.push('accountAccess', resetPasswordParams)}
            />,
            <FButton
              backgroundColor={colors[0]}
              textColor="white"
              text="Need an account?"
              buttonStyles={{
                width: '60%',
              }}
              onPress={() => Actions.push('accountAccess', createAccountParams)}
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
