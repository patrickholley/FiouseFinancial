import React from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Picker } from 'react-native';
import PropTypes from 'prop-types';
import BudgetEditorPresentation from '../Presentations/BudgetEditorPresentation';
import { SAVE_BUDGET_REQUEST } from '../constants/actions';
import allFormsValues from '../constants/allFormsValues';
import lengthTypes from '../constants/lengthTypes';

class ExpenseEditorContainer extends React.Component {
  constructor(props) {
    super(props);

    const formValues = allFormsValues.get('budgetEdit');
    const fields = formValues.get('fields');
    const budget = props.budgets[Actions.currentParams.budgetId]
      || {
        id: 'new',
        userId: props.user.uid,
        name: fields.getIn(['name', 'defaultValue']),
        lengthType: fields.getIn(['lengthType', 'defaultValue']),
        balance: fields.getIn(['balance', 'defaultValue']),
      };

    const baseFields = fields
      .setIn(['lengthType', 'items'], this.generateLengthTypePickerItems())
      .map((field, fieldId) => field.set('value', budget[fieldId]));

    this.state = {
      budgetId: budget.id,
      canSubmit: false,
      formValues: formValues.set('fields', baseFields),
    };
  }

  componentWillUpdate = newProps => {
    if (newProps.user === null) {
      Actions.replace('login');
    }
  };

  onFieldChange = (fieldId, updatedValue) => {
    // eslint-disable-next-line no-restricted-globals
    if (fieldId !== 'balance' || !isNaN(updatedValue)) {
      this.setState(oldState => {
        const formValues = oldState.formValues
          .setIn(['fields', fieldId, 'value'], updatedValue);

        return {
          canSubmit: formValues.get('fields').every(field => field.get('value') !== ''),
          formValues,
        };
      });
    }
  }

  onFormSubmit = () => {
    const fields = this.state.formValues.get('fields');
    const balance = parseFloat(fields.getIn(['balance', 'value'])).toFixed(2);

    const submittedBudget = {
      id: this.state.budgetId,
      userId: this.props.user.uid,
      name: fields.getIn(['name', 'value']),
      value: fields.getIn(['lengthType', 'value']),
      balance,
    };

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
        budgetId={this.state.budgetId}
        canSubmit={this.state.canSubmit}
        formValues={this.state.formValues}
        lengthTypes={this.lengthTypes}
        onFieldChange={this.onFieldChange}
        onFormSubmit={this.onFormSubmit}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onBudgetSubmit: (budget, budgets) => dispatch({
    type: SAVE_BUDGET_REQUEST,
    payload: { budget, budgets },
  }),
});

const mapStateToProps = state => ({
  user: state.auth.get('user'),
  budgets: state.budget.get('budgets'),
});

ExpenseEditorContainer.propTypes = {
  budgets: PropTypes.object.isRequired,
  onBudgetSubmit: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseEditorContainer);
