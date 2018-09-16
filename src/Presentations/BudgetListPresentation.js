import React from 'react';
import { Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styled from 'styled-components';
import { FButton, FWrapper } from '../FiouseUI';
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
    return (
      <View style={{ flex: 1 }}>
        {this.props.budgets.size === 0
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
          : <View>
            <Text>Hello World!</Text>
          </View>
        }
      </View>
    );
  }
}
