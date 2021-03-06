import React from 'react';
import {
  Animated,
  ScrollView,
} from 'react-native';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  FButton,
  FForm,
  FLoader,
  FOverlay,
} from '../FiouseUI';
import colors from '../constants/colors';
import logoPath from '../../assets/fiouse_logo_clear.png';

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

const ResetPasswordText = styled.Text`
  color: ${colors[2]};
  fontSize: 16;
  textAlign: center;
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
            {formValues.get('headerText')}
          </HeaderText>
          <SubheaderAnimatedText
            error={formValues.get('error')}
            style={{ opacity: this.props.fadeAnim }}
          >
            {formValues.get('subheaderText')}
          </SubheaderAnimatedText>
          <FForm
            fields={formValues.get('fields').toJS()}
            canSubmit={this.props.canSubmit}
            onFieldChange={onFieldChange}
            onFormSubmit={onFormSubmit}
            submitText={formValues.get('submitText')}
            submitButtonStyles={{ width: '60%' }}
          />
          {isLoginForm && [
            <FButton
              backgroundColor={colors[2]}
              key="resetPassword"
              text="Forgot your password?"
              buttonStyles={{
                marginBottom: 10,
                width: '60%',
              }}
              onPress={() => { this.props.onFormTypeChange('resetPassword'); }}
            />,
            <FButton
              backgroundColor={colors[0]}
              key="createAccount"
              text="Need an account?"
              buttonStyles={{
                width: '60%',
              }}
              onPress={() => { this.props.onFormTypeChange('createAccount'); }}
            />,
          ]}
          <FooterView />
          <CopyrightText>
            {`Copyright${'\u00A9'} 2018 Fiouse`}
          </CopyrightText>
        </AccountAccessView>
        {this.props.isNetworkActionInProgress && <FLoader
          text="Signing In"
        />}
        {this.props.showResetPasswordModal && <FOverlay
          containerStyles={{ height: 150, width: 225 }}
        >
          <ResetPasswordText>
            {'Please check your email for instructions on resetting your password.'}
          </ResetPasswordText>
          <FButton
            backgroundColor={colors[0]}
            buttonStyles={{ width: 205 }}
            text="Close"
            textStyles={{ fontSize: 18 }}
            onPress={this.props.onResetPasswordModalBack}
          />
        </FOverlay>}
      </ScrollView>
    );
  }
}

AccountAccessPresentation.propTypes = {
  canSubmit: PropTypes.bool.isRequired,
  fadeAnim: PropTypes.object.isRequired,
  formValues: PropTypes.object.isRequired,
  isLoginForm: PropTypes.bool.isRequired,
  isNetworkActionInProgress: PropTypes.bool,
  showResetPasswordModal: PropTypes.bool,
  onFieldChange: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onFormTypeChange: PropTypes.func.isRequired,
  onResetPasswordModalBack: PropTypes.func.isRequired,
};

AccountAccessPresentation.defaultProps = {
  isNetworkActionInProgress: false,
  showResetPasswordModal: false,
};
