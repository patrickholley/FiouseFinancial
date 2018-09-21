import React from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Picker } from 'react-native';
import PropTypes from 'prop-types';
import ExpenseEditorPresentation from '../Presentations/ExpenseEditorPresentation';
import { SAVE_BUDGET_REQUEST } from '../constants/actions';
import allFormsValues from '../constants/allFormsValues';
import lengthTypes from '../constants/lengthTypes';

class ExpenseEditorContainer extends React.Component {
  constructor(props) {
    super(props);

    console.log(props);

    const formValues = allFormsValues.get('expenseEdit');
    const fields = formValues.get('fields');
    const expense = props.expenses[Actions.currentParams.expenseId]
      || {
        id: 'new',
        userId: props.user.uid,
        date: Date.now(),
        description: fields.getIn(['description', 'defaultValue']),
        amount: fields.getIn(['amount', 'defaultValue']),
      };

    const baseFields = fields
      .map((field, fieldId) => field.set('value', expense[fieldId]));

    this.state = {
      expenseId: expense.id,
      canSubmit: false,
      formValues: formValues.set('fields, baseFields'),
    };
  }

  componentWillUpdate = newProps => {
    if (newProps.user === null) {
      Actions.replace('login');
    }
  };

  onFieldChange = (fieldId, updatedValue) => {
  }

  onFormSubmit = () => {
  }

  render() {
    return (
      <ExpenseEditorPresentation
        expenseId={this.state.expenseId}
        canSubmit={this.state.canSubmit}
        formValues={this.state.formValues}
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
  expenses: state.budget.get('expenses'),
});

ExpenseEditorContainer.propTypes = {
  budgets: PropTypes.object.isRequired,
  onBudgetSubmit: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseEditorContainer);
