import React from 'react';
import FButton from './FButton';
import FFormField from './FFormField';
import FWrapper from './FWrapper';
import colors from '../constants/colors';

const defaultStyles = {
  button: {
    margin: 20,
    width: '80%',
    height: 54,
  },
  buttonText: {
    fontSize: 24,
  }
}

export default class FForm extends React.PureComponent {
  generateFields() {
    const FFormFields = [];
    Object.keys(this.props.fields).forEach(fieldId => {
      const field = this.props.fields[fieldId];

      FFormFields.push(
        <FFormField
          key={fieldId}
          autoCapitalize={field.autoCapitalize}
          keyboardType={field.keyboardType}
          onChangeText={(updatedValue) => { this.props.onFieldChange(fieldId, updatedValue); }}
          placeholder={field.placeholder}
          secureTextEntry={field.isSecure}
        />
      );
    });
    return FFormFields;
  }

  validateForm() {
    return true;
  }

  render() {
    return (
      <FWrapper>
        {this.generateFields()}
        <FButton
          backgroundColor={colors[3]}
          onPress={this.props.onFormSubmit}
          textColor="white"
          text={this.props.submitText.toUpperCase()}
          buttonStyles={Object.assign({},
            defaultStyles.button,
            this.props.buttonStyles
          )}
          textStyles={Object.assign({},
            defaultStyles.buttonText,
            this.props.buttonTextStyles
          )}
        />
      </FWrapper>
    );
  }
}
