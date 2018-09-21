import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';
import { FButton, FWrapper } from '../FiouseUI';
import colors from '../constants/colors';

const InstructionText = styled.Text`
  color: ${colors[2]}
  font-size: 24;
  margin-bottom: 25;
  font-weight: bold;
  width: 80%;
  text-align: center;
`;

/* eslint-disable react/prefer-stateless-function */
export default class BudgetPresentation extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <FButton
          onPress={this.props.onAddPress}
          backgroundColor={colors[2]}
          buttonStyles={{
            width: 120,
            alignSelf: 'flex-end',
            top: 20,
            right: 20,
          }}
          textColor="white"
          text="+ Add Expense"
        />
        <FWrapper wrapperStyles={{ top: 40 }}>
          <InstructionText>
            {'Click \'+ Add Expense\' above to get started!'}
          </InstructionText>
        </FWrapper>
      </View>
    );
  }
}
