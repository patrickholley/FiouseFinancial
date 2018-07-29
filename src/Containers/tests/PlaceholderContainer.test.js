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
  const instance = shallow(<PlaceholderContainer.WrappedComponent />).instance();

  beforeEach(async () => {
    await AsyncStorage.clear();
    jest.clearAllMocks();
  });

  it('redirects to home properly when AsyncStorage has a user', async () => {
    await AsyncStorage.setItem('user', JSON.stringify({ email: 'test@test.com' }));
    await instance.reroute();
    expect(Actions.push).toHaveBeenCalledTimes(1);
    expect(Actions.push.mock.calls[0][0]).toBe('home');
  });

  it('redirects to login when AsyncStorage has no user', async () => {
    await instance.reroute();
    expect(Actions.push).toHaveBeenCalledTimes(1);
    expect(Actions.push.mock.calls[0][0]).toBe('accountAccess');
    expect(Actions.push.mock.calls[0][1]).toEqual({ formType: 'login' });
  });
});
