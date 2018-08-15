import { takeLatest } from 'redux-saga/effects';
import {
  authUserSaga,
  logoutSaga,
  resetPasswordSaga,
} from './authSagas';
import {
  LOGIN_REQUEST,
  NEW_ACCOUNT_REQUEST,
  RESET_PASSWORD_REQUEST,
  LOGOUT_REQUEST,
  SAVE_BUDGET_REQUEST,
} from '../constants/actions';
import { saveBudgetSaga } from './budgetSagas';

export default function* watcherSaga() {
  yield takeLatest(LOGIN_REQUEST, authUserSaga);
  yield takeLatest(LOGOUT_REQUEST, logoutSaga);
  yield takeLatest(NEW_ACCOUNT_REQUEST, authUserSaga);
  yield takeLatest(RESET_PASSWORD_REQUEST, resetPasswordSaga);
  yield takeLatest(SAVE_BUDGET_REQUEST, saveBudgetSaga);
}
