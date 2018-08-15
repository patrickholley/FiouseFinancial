import React from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Picker } from 'react-native';
import PropTypes from 'prop-types';
import BudgetEditorPresentation from '../Presentations/BudgetEditorPresentation';
import { LOGOUT_REQUEST } from '../constants/actions';
import allFormsValues from '../constants/allFormsValues';
import Budget from '../classes/Budget';

class BudgetEditorContainer extends React.Component {
  lengthTypes = [
    { Name: 'Weekly', Id: 1 },
    { Name: 'Biweekly', Id: 2 },
    { Name: 'Semimonthly', Id: 3 },
    { Name: 'Monthly', Id: 4 },
    { Name: 'Quarterly', Id: 5 },
    { Name: 'Semiannually', Id: 6 },
    { Name: 'Annually', Id: 7 },
  ];

  constructor() {
    super();

    const formValues = Object.assign({}, allFormsValues.budgetEdit);

    formValues.fields.lengthType.items = this.generateLengthTypeItems();

    this.state = {
      canSubmit: false,
      formValues,
    };
  }

  componentWillUpdate = newProps => {
    if (newProps.user === null) {
      Actions.push('login', { formType: 'login' });
    }
  };

  onFieldChange = (fieldId, updatedValue) => {
    const { formValues } = this.state;
    const { fields } = formValues;
    fields[fieldId].value = updatedValue;
    this.setState({
      canSubmit: Object.keys(fields).every(fId => fields[fId].value !== ''),
      formValues,
    });
  }

  onFormSubmit = () => {
    const { fields } = this.state.formValues;
    const balance = fields.balance.value;

    if (isNaN(balance)) { // eslint-disable-line no-restricted-globals
      // error handling here
      console.log('Not a number!');
    } else if (balance > 999999999) {
      // error handling here
      console.log('Too big!');
    } else {
      const reformattedBalance = parseFloat(balance).toFixed(2);

      const myBudget = new Budget(
        'new',
        'test@test.com',
        fields.name.value,
        fields.lengthType.value,
        reformattedBalance,
      );

      console.log(myBudget);
    }
  }

  generateLengthTypeItems = () => {
    const lengthTypeItems = [];

    this.lengthTypes.forEach(lengthType => {
      lengthTypeItems.push(
        <Picker.Item
          key={lengthType.Id}
          label={lengthType.Name}
          value={lengthType.Id}
        />,
      );
    });

    return lengthTypeItems;
  };

  render() {
    return (
      <BudgetEditorPresentation
        canSubmit={this.state.canSubmit}
        formValues={this.state.formValues}
        lengthTypes={this.lengthTypes}
        onFieldChange={this.onFieldChange}
        onFormSubmit={this.onFormSubmit}
        toggleEditor={this.props.toggleEditor}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch({
    type: LOGOUT_REQUEST,
  }),
});

const mapStateToProps = state => {
  const { user } = state.auth;
  return { user };
};

BudgetEditorContainer.propTypes = {
  toggleEditor: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(BudgetEditorContainer);
