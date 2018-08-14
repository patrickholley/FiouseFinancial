import React from 'react';
import PropTypes from 'prop-types';
import FButton from './FButton';
import FInput from './FInput';
import FPicker from './FPicker';
import FWrapper from './FWrapper';
import colors from '../constants/colors';

const defaultStyles = {
  button: {
    margin: 20,
    width: '80%',
    height: 54,
  },
  submitText: {
    fontSize: 24,
  },
};

export default class FForm extends React.PureComponent {
  generateFieldTextInput = (field, fieldId) => (
    <FInput
      key={fieldId}
      autoCapitalize={field.autoCapitalize}
      keyboardType={field.keyboardType}
      onChangeText={updatedValue => { this.props.onFieldChange(fieldId, updatedValue); }}
      placeholder={field.placeholder}
      secureTextEntry={field.secureTextEntry}
    />
  )

  generateFieldPicker = (field, fieldId) => (
    <FPicker
      key={fieldId}
      selectedValue={field.value}
      onValueChange={updatedValue => { this.props.onFieldChange(fieldId, updatedValue); }}
    >
      {field.items}
    </FPicker>
  )

  generateFields = () => {
    const FInputs = [];
    Object.keys(this.props.fields).forEach(fieldId => {
      const field = this.props.fields[fieldId];
      FInputs.push(
        field.picker
          ? this.generateFieldPicker(field, fieldId)
          : this.generateFieldTextInput(field, fieldId),
      );
    });
    return FInputs;
  }

  render() {
    return (
      <FWrapper wrapperStyles={this.props.wrapperStyles}>
        {this.generateFields()}
        <FButton
          backgroundColor={this.props.canSubmit ? colors[3] : 'lightgrey'}
          isDisabled={!this.props.canSubmit}
          onPress={this.props.onFormSubmit}
          text={this.props.submitText.toUpperCase()}
          buttonStyles={Object.assign({},
            defaultStyles.button,
            this.props.submitButtonStyles)}
          textStyles={Object.assign({},
            defaultStyles.submitText,
            this.props.submitTextStyles)}
        />
      </FWrapper>
    );
  }
}

FForm.propTypes = {
  fields: PropTypes.object.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  canSubmit: PropTypes.bool,
  onFormSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string.isRequired,
  submitButtonStyles: PropTypes.object,
  submitTextStyles: PropTypes.object,
  wrapperStyles: PropTypes.object,
};

FForm.defaultProps = {
  canSubmit: true,
  submitButtonStyles: {},
  submitTextStyles: {},
  wrapperStyles: {},
};
