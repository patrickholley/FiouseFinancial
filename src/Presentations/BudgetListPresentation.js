import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FButton } from '../FiouseUI';
import colors from '../constants/colors';
import BudgetEditorContainer from '../Containers/BudgetEditorContainer';

const addBudgetButtonRadius = 50;

const InstructionText = styled.Text`
  color: ${colors[2]}
  font-size: 24;
  margin-bottom: 25;
  font-weight: bold;
`;

/* eslint-disable react/prefer-stateless-function */
export default class BudgetListPresentation extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <InstructionText>
          {'You have no budgets yet!'}
        </InstructionText>
        <InstructionText>
          {'Tap below to make a new budget:'}
        </InstructionText>
        <FButton
          backgroundColor={colors[0]}
          buttonStyles={{
            height: 2 * addBudgetButtonRadius,
            width: 2 * addBudgetButtonRadius,
            borderRadius: addBudgetButtonRadius,
          }}
          onPress={this.props.toggleEditor}
          text="+"
          textColor="white"
          textStyles={{ lineHeight: 125, fontSize: 100 }}
        />
        {this.props.isEditorOpen && <BudgetEditorContainer
          toggleEditor={this.props.toggleEditor}
        />}
      </View>
    );
  }
}

BudgetListPresentation.propTypes = {
  isEditorOpen: PropTypes.bool.isRequired,
  toggleEditor: PropTypes.func.isRequired,
};

BudgetListPresentation.defaultProps = {
};
