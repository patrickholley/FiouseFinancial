import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import colors from '../constants/colors';

const FiouseInput = styled.TextInput`
  fontSize: 20;
  width: 90%;
`;

export default class FInput extends React.PureComponent {
  render() {
    console.log(this.props.keyboardType);

    return (
      <FiouseInput
        autoCapitalize={this.props.autoCapitalize}
        keyboardType={this.props.keyboardType}
        onChangeText={this.props.onChangeText}
        placeholder={this.props.placeholder}
        secureTextEntry={this.props.secureTextEntry}
        selectionColor={colors[2]}
        underlineColorAndroid={colors[2]}
      />
    );
  }
}

FInput.propTypes = {
  autoCapitalize: PropTypes.string,
  keyboardType: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  secureTextEntry: PropTypes.bool,
};

FInput.defaultProps = {
  autoCapitalize: 'none',
  keyboardType: 'default',
  placeholder: '',
  secureTextEntry: false,
};
