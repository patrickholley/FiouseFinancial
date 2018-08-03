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
  const prepDispatchSubmitSpy = jest.spyOn(instance, 'prepDispatchSubmit');

  beforeEach(() => {
    jest.clearAllMocks();
    Actions.setCurrentScene(null);
  });

  describe('onFormSubmit', () => {
    const testOnFormSubmit = (formType, fields) => {
      Actions.setCurrentScene(formType);
      instance.setState({
        formType,
        formValues: {
          fields,
        },
      }, () => {
        instance.onFormSubmit();
      });
    };

    const correctValue = { value: 'correct' };
    const incorrectValue = { value: 'incorrect' };

    const mismatchedFields = {
      password: correctValue,
      confirmPassword: incorrectValue,
    };

    const matchedFields = {
      password: correctValue,
      confirmPassword: correctValue,
    };

    it(`posts an error subheader when formType is createAccount
      and password and confirmPassword do not match`, () => {
      testOnFormSubmit('createAccount', mismatchedFields);
      expect(postSubheaderSpy.mock.calls[0][0]).toBe('Passwords must match');
    });

    it(`calls prepDispatchSubmit when formType is createAccount
      and password and confirmPassword do match`, () => {
      testOnFormSubmit('createAccount', matchedFields);
      expect(prepDispatchSubmitSpy.mock.calls[0][0]).toEqual(matchedFields);
    });

    it('calls prepDispatchSubmit when formType is not createAccount', () => {
      testOnFormSubmit('login', mismatchedFields);
      expect(prepDispatchSubmitSpy.mock.calls[0][0]).toEqual(mismatchedFields);
    });
  });

  describe('prepDispatchSubmit', () => {
    const testPrepDispatchSubmit = (formType, actionType) => {
      onDispatchSubmitSpy.mockClear();
      Actions.setCurrentScene(formType);
      instance.setState({ formType }, () => {
        instance.prepDispatchSubmit({});
        expect(onDispatchSubmitSpy.mock.calls[0][0]).toBe(actionType);
      });
    };

    it('calls onDispatchSubmit with the proper submitAction', () => {
      testPrepDispatchSubmit('login', LOGIN_REQUEST);
      testPrepDispatchSubmit('createAccount', NEW_ACCOUNT_REQUEST);
      testPrepDispatchSubmit('resetPassword', RESET_PASSWORD_REQUEST);
    });
  });
});
