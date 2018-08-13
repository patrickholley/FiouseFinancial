import React from 'react';
import { Picker } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../constants/colors';
import FOverlay from '../FiouseUI/FOverlay';
import { FForm } from '../FiouseUI';

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
          height: '90%',
          width: '90%',
        }}
      >
        <FForm
          fields={formValues.fields}
          canSubmit={canSubmit}
          onFieldChange={onFieldChange}
          onFormSubmit={onFormSubmit}
          submitText={formValues.submitText}
          submitButtonStyles={{ width: '60%' }}
        />
      </FOverlay>
    );
  }
}

BudgetEditorPresentation.propTypes = {
  canSubmit: PropTypes.bool.isRequired,
  formValues: PropTypes.object.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

BudgetEditorPresentation.defaultProps = {
};
