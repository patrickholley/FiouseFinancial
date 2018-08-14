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
          height: 300,
          width: 300,
        }}
      >
        <FForm
          submitButtonStyles={{ width: '90%' }}
          fields={formValues.fields}
          canSubmit={canSubmit}
          onFieldChange={onFieldChange}
          onFormSubmit={onFormSubmit}
          submitText={formValues.submitText}
          wrapperStyles={{ height: '100%', justifyContent: 'space-between' }}
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
