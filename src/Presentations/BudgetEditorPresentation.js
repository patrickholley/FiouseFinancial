import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import colors from '../constants/colors';
import { FButton, FForm, FWrapper } from '../FiouseUI';

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
      /* <FOverlay
        containerStyles={{
          height: 300,
          width: 300,
        }}
        enableFeedback
        onOverlayPress={this.props.toggleEditor}
      > */
      <FWrapper wrapperStyles={{ marginTop: 40 }}>
        <FForm
          submitButtonStyles={{ width: '80%' }}
          fields={formValues.get('fields').toJS()}
          canSubmit={canSubmit}
          onFieldChange={onFieldChange}
          onFormSubmit={onFormSubmit}
          submitText={`${this.props.budgetId === 'new' ? 'Create' : 'Update'} Budget`}
        />
        <FButton
          onPress={() => { Actions.pop(); }}
          backgroundColor={colors[1]}
          text="Cancel"
          buttonStyles={{ width: '80%' }}
          textStyles={{ fontSize: 20 }}
        />
      </FWrapper>
      /* </FOverlay> */
    );
  }
}

BudgetEditorPresentation.propTypes = {
  budgetId: PropTypes.string.isRequired,
  canSubmit: PropTypes.bool.isRequired,
  formValues: PropTypes.object.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};
