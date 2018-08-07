import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FButton } from '../FiouseUI';
import colors from '../constants/colors';
import FOverlay from '../FiouseUI/FOverlay';

/* eslint-disable react/prefer-stateless-function */
export default class BudgetEditorPresentation extends React.Component {
  render() {
    return (
      <FOverlay
        containerStyles={{
          height: '90%',
          width: '90%',
        }}
      >
        Hello World!
      </FOverlay>
    );
  }
}

BudgetEditorPresentation.propTypes = {
};

BudgetEditorPresentation.defaultProps = {
};
