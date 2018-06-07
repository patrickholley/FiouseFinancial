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
    this.props.fields.forEach(field => {
      FFormFields.push(<FFormField key={field} placeholder={field} />);
    });
    return FFormFields;
  }

  render() {
    return (
      <FWrapper>
        {this.generateFields()}
        <FButton
          backgroundColor={colors[3]}
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
