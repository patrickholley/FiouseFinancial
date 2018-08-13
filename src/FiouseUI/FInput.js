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
        keyboardType={this.props.type === 'email' ? 'email-address' : 'default'}
        onChangeText={this.props.onChangeText}
        placeholder={this.props.placeholder}
        secureTextEntry={this.props.type === 'password'}
        selectionColor={colors[2]}
        underlineColorAndroid={colors[2]}
      />
    );
  }
}

FInput.propTypes = {
  autoCapitalize: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

FInput.defaultProps = {
  autoCapitalize: 'none',
  placeholder: '',
};
