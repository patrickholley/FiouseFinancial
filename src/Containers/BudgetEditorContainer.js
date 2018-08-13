import React from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Picker } from 'react-native';
import PropTypes from 'prop-types';
import BudgetEditorPresentation from '../Presentations/BudgetEditorPresentation';
import { LOGOUT_REQUEST } from '../constants/actions';
import allFormsValues from '../constants/allFormsValues';

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
    Object.keys(formValues.fields).forEach(fieldId => {
      formValues.fields[fieldId].value = '';
    });

    formValues.fields.lengthType.items = this.generateLengthTypeItems();

    this.state = {
      canSubmit: false,
      formValues,
      selectedLengthType: 0,
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

  generateLengthTypeItems = () => {
    const lengthTypeItems = [];

    this.lengthTypes.forEach(lengthType => {
      lengthTypeItems.push(<Picker.Item label={lengthType.Name} value={lengthType.Id} />);
    });

    return lengthTypeItems;
  };

  render() {
    return (
      <BudgetEditorPresentation
        canSubmit={this.state.canSubmit}
        formValues={this.state.formValues}
        selectedLengthType={this.state.selectedLengthType}
        lengthTypes={this.lengthTypes}
        onFieldChange={this.onFieldChange}
        onFormSubmit={() => {}}
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
  onLogout: PropTypes.func.isRequired,
  user: PropTypes.object,
};

BudgetEditorContainer.defaultProps = {
  user: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(BudgetEditorContainer);
