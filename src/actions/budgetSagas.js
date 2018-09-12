import { call, put } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { SAVE_BUDGET_ERROR, SAVE_BUDGET_RESPONSE } from '../constants/actions';

// eslint-disable-next-line import/prefer-default-export
export function* saveBudgetSaga({ payload }) {
  try {
    const { budget, budgets } = payload;

    if (budget.id === 'new') {
      const budgetIds = budgets.keySeq().toArray();
      budget.id = `local${
        budgetIds.length > 0
          ? Number(budgetIds[budgetIds.length - 1].replace('local', '')) + 1
          : 1
      }`;
    }

    const updatedBudgetsJson = JSON.stringify(budgets.set(budget.id, budget));

    yield call([AsyncStorage, 'setItem'], 'budgets', JSON.stringify(updatedBudgetsJson));

    yield put({ type: SAVE_BUDGET_RESPONSE, payload: { budgets: JSON.parse(updatedBudgetsJson) } });
  } catch (error) {
    console.error(error);
    yield put({ type: SAVE_BUDGET_ERROR, payload: { clientError: 'Something went wrong' } });
  }
}
