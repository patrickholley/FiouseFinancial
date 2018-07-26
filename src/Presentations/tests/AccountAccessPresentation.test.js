import React from 'react';
import { shallow } from 'enzyme';
import AccountAccessPresentation from '../AccountAccessPresentation';

const testFormValues = {
  fields: {
    email: { placeholder: 'Email', type: 'email' },
    password: { placeholder: 'Password', type: 'password' },
  },
  headerText: 'Financial Assistant',
  subheaderText: '',
  submitText: 'Login',
};

const dummyFn = () => {};

it('renders correctly', () => {
  const wrapper = shallow(
    <AccountAccessPresentation
      canSubmit
      fadeAnim={{}}
      formValues={testFormValues}
      isLoginForm
      onFieldChange={dummyFn}
      onFormSubmit={dummyFn}
    />,
  );

  expect(wrapper).toMatchSnapshot();
});
