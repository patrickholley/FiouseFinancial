import { call, put } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { SAVE_BUDGET_ERROR, SAVE_BUDGET_RESPONSE } from '../constants/actions';

// eslint-disable-next-line import/prefer-default-export
export function* saveBudgetSaga({ payload }) {
  try {
    // individual budget available for network actions later
    const { budgets } = payload;
    yield call([AsyncStorage, 'setItem'], 'budgets', JSON.stringify(budgets));

    yield put({ type: SAVE_BUDGET_RESPONSE, payload: { budgets } });
  } catch (error) {
    console.error(error);
    yield put({ type: SAVE_BUDGET_ERROR, payload: { clientError: 'Something went wrong' } });
  }
}
