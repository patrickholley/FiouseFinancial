import React from 'react';
import { Animated, ScrollView, View } from 'react-native';
import styled from 'styled-components';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import FButton from '../FiouseUI/FButton';
import FForm from '../FiouseUI/FForm';
import colors from '../constants/colors';

const logoPath = require('../../assets/fiouse_logo_clear.png');

const AccountAccessView = styled.View`
  alignItems: center;
  display: flex;
  flex: 1;
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
  color: ${props => (props.error ? 'red' : colors[2])};
  fontSize: 14;
  fontStyle: italic;
  height: 50px;
  width: 90%;
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

    const {
      formValues, isLoginForm, onFieldChange, onFormSubmit,
    } = this.props;

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <AccountAccessView>
          {isLoginForm
            ? <LargeLogoImage
              source={logoPath}
              resizeMode="center"
            />
            : <SmallLogoImage
              source={logoPath}
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
            canSubmit={this.props.canSubmit}
            onFieldChange={onFieldChange}
            onFormSubmit={onFormSubmit}
            submitText={formValues.submitText}
            buttonStyles={{ width: '60%' }}
          />
          {isLoginForm ? [
            <FButton
              backgroundColor={colors[2]}
              key="resetPassword"
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
              key="createAccount"
              textColor="white"
              text="Need an account?"
              buttonStyles={{
                width: '60%',
              }}
              onPress={() => Actions.push('accountAccess', createAccountParams)}
            />,
          ] : <View />}
          <FooterView />
          <CopyrightText>
            {`Copyright${'\u00A9'} 2018 Fiouse`}
          </CopyrightText>
        </AccountAccessView>
      </ScrollView>
    );
  }
}

AccountAccessPresentation.propTypes = {
  canSubmit: PropTypes.bool.isRequired,
  fadeAnim: PropTypes.object.isRequired,
  formValues: PropTypes.object.isRequired,
  isLoginForm: PropTypes.bool.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};