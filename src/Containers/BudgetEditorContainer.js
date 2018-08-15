import React from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Picker } from 'react-native';
import PropTypes from 'prop-types';
import BudgetEditorPresentation from '../Presentations/BudgetEditorPresentation';
import { SAVE_BUDGET_REQUEST } from '../constants/actions';
import allFormsValues from '../constants/allFormsValues';
import lengthTypes from '../constants/lengthTypes';
import Budget from '../classes/Budget';

class BudgetEditorContainer extends React.Component {
  constructor(props) {
    super(props);

    const formValues = Object.assign({}, allFormsValues.budgetEdit);

    formValues.fields.lengthType.items = this.generateLengthTypePickerItems();

    this.state = {
      budgetId: Actions.currentParams.budgetId || 'new',
      canSubmit: false,
      formValues,
    };
  }

  componentWillUpdate = newProps => {
    if (newProps.user === null) {
      Actions.replace('login');
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

    // eslint-disable-next-line no-restricted-globals
    if (isNaN(balance)) {
      // error handling here
      console.log('Not a number!');
    } else if (balance > 999999999) {
      // error handling here
      console.log('Too big!');
    } else {
      const reformattedBalance = parseFloat(balance).toFixed(2);

      const submittedBudget = new Budget(
        this.state.budgetId,
        this.props.user.uid,
        fields.name.value,
        fields.lengthType.value,
        reformattedBalance,
      );

      console.log(submittedBudget);
    }
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
        toggleEditor={this.props.toggleEditor}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onBudgetSubmit: () => dispatch({
    type: SAVE_BUDGET_REQUEST,
  }),
});

const mapStateToProps = state => {
  const { user } = state.auth;
  return { user };
};

BudgetEditorContainer.propTypes = {
  toggleEditor: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(BudgetEditorContainer);
