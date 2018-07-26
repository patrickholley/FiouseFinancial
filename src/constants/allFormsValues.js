export default {
  login: {
    fields: {
      email: { placeholder: 'Email', type: 'email' },
      password: { placeholder: 'Password', type: 'password' },
    },
    headerText: 'Financial Assistant',
    subheaderText: '',
    submitText: 'Login',
  },
  resetPassword: {
    fields: {
      email: { placeholder: 'Email', type: 'email' },
    },
    headerText: 'Reset Password',
    subheaderText: 'Please enter the email address associated with your account below',
    submitText: 'Submit',
  },
  createAccount: {
    fields: {
      email: { placeholder: 'Email', type: 'email' },
      password: { placeholder: 'Password', type: 'password' },
      confirmPassword: { placeholder: 'Confirm Password', type: 'password' },
    },
    headerText: 'Create New Account',
    subheaderText: 'Your email address will be used for authentication, technical support, and password recovery only',
    submitText: 'Submit',
  },
};
