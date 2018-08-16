import React from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Picker } from 'react-native';
import PropTypes from 'prop-types';
import BudgetEditorPresentation from '../Presentations/BudgetEditorPresentation';
import { SAVE_BUDGET_REQUEST } from '../constants/actions';
import allFormsValues from '../constants/allFormsValues';
import lengthTypes from '../constants/lengthTypes';
import Budget from '../Classes/Budget';

class BudgetEditorContainer extends React.Component {
  constructor(props) {
    super(props);

    const formValues = Object.assign({}, allFormsValues.budgetEdit);
    const { fields } = formValues;
    const budget = props.budgets[Actions.currentParams.budgetId]
      || new Budget(
        'new',
        props.user.uid,
        fields.name.defaultValue,
        fields.lengthType.defaultValue,
        fields.balance.defaultValue,
      );

    console.log(budget);

    fields.lengthType.items = this.generateLengthTypePickerItems();

    Object.keys(fields).forEach(fieldId => {
      fields[fieldId].value = budget[fieldId];
    });

    this.state = {
      budget,
      canSubmit: false,
      formValues,
    };
  }

  componentWillUpdate = newProps => {
    console.log(newProps.budgets);

    if (newProps.user === null) {
      Actions.replace('login');
    }
  };

  onFieldChange = (fieldId, updatedValue) => {
    // eslint-disable-next-line no-restricted-globals
    if (fieldId !== 'balance' || (!isNaN(updatedValue) && updatedValue.length <= 9)) {
      const { formValues } = this.state;
      const { fields } = formValues;
      fields[fieldId].value = updatedValue;
      this.setState({
        canSubmit: Object.keys(fields).every(fId => fields[fId].value !== ''),
        formValues,
      });
    }
  }

  onFormSubmit = () => {
    const { fields } = this.state.formValues;
    const balance = fields.balance.value;

    const reformattedBalance = parseFloat(balance).toFixed(2);

    const submittedBudget = new Budget(
      this.state.budget.id,
      this.props.user.uid,
      fields.name.value,
      fields.lengthType.value,
      reformattedBalance,
    );

    this.props.onBudgetSubmit(submittedBudget, this.props.budgets);
  }

  generateLengthTypePickerItems = () => {
    const lengthTypePickerItems = [];

    lengthTypes.forEach(lengthType => {
      lengthTypePickerItems.push(
        <Picker.Item
          key={lengthType.Id}
          label={lengthType.Name}
          value={lengthType.Id}
        />,
      );
    });

    return lengthTypePickerItems;
  };

  render() {
    return (
      <BudgetEditorPresentation
        budgetId={this.state.budget.id}
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
  onBudgetSubmit: (budget, budgets) => {
    return dispatch({
      type: SAVE_BUDGET_REQUEST,
      payload: { budget, budgets },
    });
  },
});

const mapStateToProps = state => {
  const { user } = state.auth;
  const { budgets } = state.budget;
  return { user, budgets };
};

BudgetEditorContainer.propTypes = {
  budgets: PropTypes.object,
  toggleEditor: PropTypes.func.isRequired,
  onBudgetSubmit: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

BudgetEditorContainer.defaultProps = {
  budgets: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(BudgetEditorContainer);
