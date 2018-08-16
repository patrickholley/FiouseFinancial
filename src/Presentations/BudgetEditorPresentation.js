import React from 'react';
import PropTypes from 'prop-types';
import colors from '../constants/colors';
import FOverlay from '../FiouseUI/FOverlay';
import { FButton, FForm } from '../FiouseUI';

/* eslint-disable react/prefer-stateless-function */
export default class BudgetEditorPresentation extends React.Component {
  render() {
    const {
      canSubmit,
      formValues,
      onFieldChange,
      onFormSubmit,
    } = this.props;

    return (
      <FOverlay
        containerStyles={{
          height: 300,
          width: 300,
        }}
        enableFeedback
        onOverlayPress={this.props.toggleEditor}
      >
        <FForm
          submitButtonStyles={{ width: '90%' }}
          fields={formValues.fields}
          canSubmit={canSubmit}
          onFieldChange={onFieldChange}
          onFormSubmit={onFormSubmit}
          submitText={`${this.props.budgetId === 'new' ? 'Create' : 'Update'} Budget`}
        />
        <FButton
          onPress={this.props.toggleEditor}
          backgroundColor={colors[1]}
          text="Cancel"
          buttonStyles={{ width: '90%', marginLeft: '5%' }}
          textStyles={{ fontSize: 20 }}
        />
      </FOverlay>
    );
  }
}

BudgetEditorPresentation.propTypes = {
  budgetId: PropTypes.string.isRequired,
  canSubmit: PropTypes.bool.isRequired,
  formValues: PropTypes.object.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  toggleEditor: PropTypes.func.isRequired,
};
