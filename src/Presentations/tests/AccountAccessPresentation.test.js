import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AccountAccessPresentation from '../AccountAccessPresentation';

configure({ adapter: new Adapter() });

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
