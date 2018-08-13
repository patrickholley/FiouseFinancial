import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import colors from '../constants/colors';

const FiousePicker = styled.Picker`
  height: 50;
  width: 200;
`;

export default class FPicker extends React.PureComponent {
  render() {
    return (
      <FiousePicker
        selectedValue={this.props.selectedValue}
        onValueChange={itemValue => { this.props.onValueChange(itemValue); }}
      >
        {this.props.children}
      </FiousePicker>
    );
  }
}

FPicker.propTypes = {
  autoCapitalize: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

FPicker.defaultProps = {
  autoCapitalize: 'none',
  placeholder: '',
};
