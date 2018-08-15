import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const FiousePicker = styled.Picker`
  width: 90%;
`;

export default class FPicker extends React.PureComponent {
  render() {
    return (
      <FiousePicker
        selectedValue={this.props.selectedValue}
        onValueChange={this.props.onValueChange}
      >
        {this.props.children}
      </FiousePicker>
    );
  }
}

FPicker.propTypes = {
  selectedValue: PropTypes.any,
  onValueChange: PropTypes.func.isRequired,
};

FPicker.defaultProps = {
  selectedValue: null,
};
