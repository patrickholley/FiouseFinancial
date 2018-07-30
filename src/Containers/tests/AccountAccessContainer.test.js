import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AccountAccessContainer from '../AccountAccessContainer';
import { Actions } from '../../../__mocks__/react-native-router-flux';

configure({ adapter: new Adapter() });

describe('AccountAccessContainer', () => {
  const onDispatchSubmitSpy = jest.fn();

  const instance = shallow(
    <AccountAccessContainer.WrappedComponent
      onDispatchSubmit={onDispatchSubmitSpy}
    />,
  ).instance();

  it('works?', () => {
    expect(true).toBe(true);
  });
});
