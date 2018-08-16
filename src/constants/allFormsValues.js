export default {
  login: {
    fields: {
      email: {
        placeholder: 'Email',
        keyboardType: 'email-address',
        value: '',
      },
      password: {
        placeholder: 'Password',
        secureTextEntry: true,
        value: '',
      },
    },
    headerText: 'Financial Assistant',
    subheaderText: '',
    submitText: 'Login',
  },
  resetPassword: {
    fields: {
      email: {
        placeholder: 'Email',
        keyboardType: 'email-address',
        value: '',
      },
    },
    headerText: 'Reset Password',
    subheaderText: 'Please enter the email address associated with your account below',
    submitText: 'Submit',
  },
  createAccount: {
    fields: {
      email: {
        placeholder: 'Email',
        keyboardType: 'email-address',
        value: '',
      },
      password: {
        placeholder: 'Password',
        secureTextEntry: true,
        value: '',
      },
      confirmPassword: {
        placeholder: 'Confirm Password',
        secureTextEntry: true,
        value: '',
      },
    },
    headerText: 'Create New Account',
    subheaderText: 'Your email address will be used for authentication, technical support, and password recovery only',
    submitText: 'Submit',
  },
  budgetEdit: {
    fields: {
      name: { placeholder: 'Name', defaultValue: '' },
      lengthType: { picker: true, defaultValue: 1 },
      balance: {
        placeholder: 'Balance Amount',
        keyboardType: 'numeric',
        maxLength: 10,
        defaultValue: '',
      },
    },
  },
};
