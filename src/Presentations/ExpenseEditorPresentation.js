import React from 'react';
import PropTypes from 'prop-types';
import { FForm, FWrapper } from '../FiouseUI';

/* eslint-disable react/prefer-stateless-function */
export default class ExpenseEditorPresentation extends React.Component {
  render() {
    const {
      canSubmit,
      formValues,
      onFieldChange,
      onFormSubmit,
    } = this.props;

    return (
      <FWrapper wrapperStyles={{ marginTop: 40 }}>
        <FForm
          submitButtonStyles={{ width: '80%' }}
          fields={formValues.get('fields').toJS()}
          canSubmit={canSubmit}
          onFieldChange={onFieldChange}
          onFormSubmit={onFormSubmit}
          submitText={`${this.props.budgetId === 'new' ? 'Create' : 'Update'} Budget`}
        />
      </FWrapper>
    );
  }
}

ExpenseEditorPresentation.propTypes = {
  budgetId: PropTypes.string.isRequired,
  canSubmit: PropTypes.bool.isRequired,
  formValues: PropTypes.object.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};
