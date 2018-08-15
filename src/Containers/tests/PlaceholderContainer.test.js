import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MockAsyncStorage from '../../../__mocks__/AsyncStorage';
import { Actions } from '../../../__mocks__/react-native-router-flux';
import PlaceholderContainer from '../PlaceholderContainer';

configure({ adapter: new Adapter() });

const AsyncStorage = new MockAsyncStorage({});

jest.setMock('AsyncStorage', AsyncStorage);

describe('PlaceholderContainer', () => {
  const testUserData = { email: 'test@test.com' };
  const restoreUserSpy = jest.fn();

  const instance = shallow(
    <PlaceholderContainer.WrappedComponent
      restoreUser={restoreUserSpy}
      restoreBudgets={() => {}}
    />,
  ).instance();

  beforeEach(async () => {
    await AsyncStorage.clear();
    jest.clearAllMocks();
  });

  it('redirects to home properly when AsyncStorage has a user', async () => {
    await AsyncStorage.setItem('user', JSON.stringify(testUserData));
    await instance.reroute();
    expect(Actions.replace).toHaveBeenCalledTimes(1);
    expect(Actions.replace.mock.calls[0][0]).toBe('budgetList');
    expect(restoreUserSpy).toHaveBeenCalledTimes(1);
    expect(restoreUserSpy.mock.calls[0][0]).toEqual(testUserData);
  });

  it('redirects to login when AsyncStorage has no user', async () => {
    await instance.reroute();
    expect(Actions.replace).toHaveBeenCalledTimes(1);
    expect(Actions.replace.mock.calls[0][0]).toBe('login');
    expect(restoreUserSpy).toHaveBeenCalledTimes(0);
  });
});
