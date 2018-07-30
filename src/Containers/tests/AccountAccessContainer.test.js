import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AccountAccessContainer from '../AccountAccessContainer';
import { Actions } from '../../../__mocks__/react-native-router-flux';
import MockAnimated from '../../../__mocks__/Animated';
import {
  LOGIN_REQUEST,
  NEW_ACCOUNT_REQUEST,
  RESET_PASSWORD_REQUEST,
} from '../../constants/actions';

configure({ adapter: new Adapter() });

jest.setMock('Animated', MockAnimated);

describe('AccountAccessContainer', () => {
  const onDispatchSubmitSpy = jest.fn();

  const instance = shallow(
    <AccountAccessContainer.WrappedComponent
      onDispatchSubmit={onDispatchSubmitSpy}
    />,
  ).instance();

  const postSubheaderSpy = jest.spyOn(instance, 'postSubheader');

  beforeEach(() => {
    jest.clearAllMocks();
    Actions.setCurrentParams({});
  });

  describe('onFormSubmit', () => {
    it(`posts an error subheader when formType is createAccount
      and password and confirmPassword do not match`, () => {
      Actions.setCurrentParams({ formType: 'createAccount' });
      instance.setState({
        formValues: {
          fields: {
            password: { value: 'correct' },
            confirmPassword: { value: 'incorrect' },
          },
        },
      }, () => {
        instance.onFormSubmit();
        expect(postSubheaderSpy.mock.calls[0][0]).toBe('Passwords must match');
      });
    });

    it('calls prepDispatchSubmit otherwise', () => {

    });
  });

  describe('preDispatchSubmit', () => {
    const testPrepDispatchSubmit = (formType, actionType) => {
      onDispatchSubmitSpy.mockClear();
      Actions.setCurrentParams({ formType });
      instance.prepDispatchSubmit({});
      expect(onDispatchSubmitSpy.mock.calls[0][0]).toBe(actionType);
    };

    it('calls onDispatchSubmit with the proper submitAction', () => {
      testPrepDispatchSubmit('login', LOGIN_REQUEST);
      testPrepDispatchSubmit('createAccount', NEW_ACCOUNT_REQUEST);
      testPrepDispatchSubmit('resetPassword', RESET_PASSWORD_REQUEST);
    });
  });
});
