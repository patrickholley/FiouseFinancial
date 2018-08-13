export default {
  login: {
    fields: {
      email: { placeholder: 'Email', keyboardType: 'email-address' },
      password: { placeholder: 'Password', secureTextEntry: true },
    },
    headerText: 'Financial Assistant',
    subheaderText: '',
    submitText: 'Login',
  },
  resetPassword: {
    fields: {
      email: { placeholder: 'Email', keyboardType: 'email-address' },
    },
    headerText: 'Reset Password',
    subheaderText: 'Please enter the email address associated with your account below',
    submitText: 'Submit',
  },
  createAccount: {
    fields: {
      email: { placeholder: 'Email', keyboardType: 'email-address' },
      password: { placeholder: 'Password', secureTextEntry: true },
      confirmPassword: { placeholder: 'Confirm Password', secureTextEntry: true },
    },
    headerText: 'Create New Account',
    subheaderText: 'Your email address will be used for authentication, technical support, and password recovery only',
    submitText: 'Submit',
  },
  budgetEdit: {
    fields: {
      name: { placeholder: 'Name' },
      lengthType: { picker: true },
      balance: { placeholder: 'Balance Amount', keyboardType: 'numeric' },
    },
    submitText: 'Create Budget',
  },
};
