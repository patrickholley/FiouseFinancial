import { call, put } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import {
  SAVE_BUDGET_ERROR,
  SAVE_BUDGET_RESPONSE,
  SAVE_EXPENSE_RESPONSE,
  SAVE_EXPENSE_ERROR,
} from '../constants/actions';

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

    yield call([AsyncStorage, 'setItem'], 'budgets', updatedBudgetsJson);

    yield put({ type: SAVE_BUDGET_RESPONSE, payload: { budgets: JSON.parse(updatedBudgetsJson) } });
  } catch (error) {
    console.error(error);
    yield put({ type: SAVE_BUDGET_ERROR, payload: { clientError: 'Something went wrong' } });
  }
}

export function* saveExpenseSaga({ payload }) {
  try {
    const { expense, expenses } = payload;

    if (expense.id === 'new') {
      const expenseIds = expenses.keySeq().toArray();
      expense.id = `local${
        expenseIds.length > 0
          ? Number(expenseIds[expenseIds.length - 1].replace('local', '')) + 1
          : 1
      }`;
    }

    const updatedExpensesJson = JSON.stringify(expenses.set(expense.id, expense));

    yield call([AsyncStorage, 'setItem'], 'expenses', updatedExpensesJson);

    yield put({
      type: SAVE_EXPENSE_RESPONSE,
      payload: { expenses: JSON.parse(updatedExpensesJson) },
    });
  } catch (error) {
    console.error(error);
    yield put({ type: SAVE_EXPENSE_ERROR, payload: { clientError: 'Something went wrong' } });
  }
}
