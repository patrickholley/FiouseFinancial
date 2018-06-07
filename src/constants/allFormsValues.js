export default allFormsValues = {
  login: {
    fields: {
      email: { placeholder: 'Email', keyboardType: 'email-address' },
      password: { placeholder: 'Password', isSecure: true },
    },
    headerText: 'Financial Assistant',
    submitText: 'Login',
  },
  resetPassword: {
    fields: {
      email: { placeholder: 'Email', keyboardType: 'email-address' },
    },
    headerText: 'Reset Password',
    subheaderText: 'Please enter the email address associated with your account below.',
    submitText: 'Submit',
  },
  createAccount: {
    fields: {
      email: { placeholder: 'Email', keyboardType: 'email-address' },
      confirmEmail: { placeholder: 'Confirm Email', keyboardType: 'email-address' },
      password: { placeholder: 'Password', isSecure: true },
      confirmPassword: { placeholder: 'Confirm Password', isSecure: true },
    },
    headerText: 'Create New Account',
    subheaderText: 'Your email address will be used for authentication, technical support, and password recovery only',
    submitText: 'Submit',
  },
};