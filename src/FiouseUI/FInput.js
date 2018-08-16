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
    return (
      <FiouseInput
        autoCapitalize={this.props.autoCapitalize}
        keyboardType={this.props.keyboardType}
        maxLength={this.props.maxLength}
        onChangeText={this.props.onChangeText}
        placeholder={this.props.placeholder}
        secureTextEntry={this.props.secureTextEntry}
        selectionColor={colors[2]}
        underlineColorAndroid={colors[2]}
        value={this.props.value}
      />
    );
  }
}

FInput.propTypes = {
  autoCapitalize: PropTypes.string,
  keyboardType: PropTypes.string,
  maxLength: PropTypes.number,
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  value: PropTypes.string,
};

FInput.defaultProps = {
  autoCapitalize: 'none',
  keyboardType: 'default',
  maxLength: 100,
  placeholder: '',
  secureTextEntry: false,
  value: '',
};
