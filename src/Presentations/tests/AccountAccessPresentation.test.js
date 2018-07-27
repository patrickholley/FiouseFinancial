import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AccountAccessPresentation from '../AccountAccessPresentation';
import { FButton, FForm } from '../../FiouseUI';
import allFormsValues from '../../constants/allFormsValues';

configure({ adapter: new Adapter() });

const dummyFn = () => {};

describe('AccountAccessPresentation', () => {
  const createWrapper = (formType, isLoginForm) => shallow(
    <AccountAccessPresentation
      canSubmit
      fadeAnim={{}}
      formValues={allFormsValues[formType]}
      isLoginForm={isLoginForm}
      onFieldChange={dummyFn}
      onFormSubmit={dummyFn}
    />,
  );

  it('renders login page correctly', () => {
    const wrapper = createWrapper('login', true);

    expect(wrapper.find(FForm)).toHaveLength(1);
    expect(wrapper.find(FButton)).toHaveLength(2);
  });

  /* it('renders resetPassword page correctly', () => {
    const wrapper = createWrapper('resetPassword', false);

    expect(wrapper).toMatchSnapshot();
  });


  it('renders createAccount page correctly', () => {
    const wrapper = createWrapper('createAccount', false);

    expect(wrapper).toMatchSnapshot();
  }); */
});
