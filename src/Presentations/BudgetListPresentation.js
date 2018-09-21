import React from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styled from 'styled-components';
import { FButton, FTable, FWrapper } from '../FiouseUI';
import colors from '../constants/colors';

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
    const {
      budgets,
      onRowPressIn,
      onRowPressOut,
    } = this.props;

    return (
      <View style={{ flex: 1 }}>
        {budgets.size === 0
          ? <FWrapper wrapperStyles={{ justifyContent: 'center', flex: 1 }}>
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
              onPress={() => { Actions.push('budgetEditor', { title: 'Add Budget' }); }}
              text="+"
              textStyles={{ lineHeight: 125, fontSize: 100 }}
            />
          </FWrapper>
          : <View style={{ flex: 1, alignItems: 'center', paddingTop: 40 }}>
            <FTable
              data={budgets.toJS()}
              columns={['name', 'balance']}
              columnStyles={{
                name: { flex: 2 },
                balance: { flex: 1 },
              }}
              onRowPressIn={onRowPressIn}
              onRowPressOut={onRowPressOut}
            />
          </View>
        }
      </View>
    );
  }
}
