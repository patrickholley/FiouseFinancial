import React from 'react';
import { Picker } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../constants/colors';
import FOverlay from '../FiouseUI/FOverlay';

/* eslint-disable react/prefer-stateless-function */
export default class BudgetEditorPresentation extends React.Component {
  generateLengthTypeItems = () => {
    const lengthTypeItems = [];

    this.props.lengthTypes.forEach(lengthType => {
      lengthTypeItems.push(<Picker.Item label={lengthType.Name} value={lengthType.Id} />);
    });

    return lengthTypeItems;
  };

  render() {
    return (
      <FOverlay
        containerStyles={{
          height: '90%',
          width: '90%',
        }}
      >
        <Picker
          selectedValue={this.props.currentLengthType}
          style={{ height: 50, width: 100 }}
          onValueChange={itemValue => { this.props.onValueChange(itemValue); }}
        >
          {this.generateLengthTypeItems()}
        </Picker>
      </FOverlay>
    );
  }
}

BudgetEditorPresentation.propTypes = {
};

BudgetEditorPresentation.defaultProps = {
};
