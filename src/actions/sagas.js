import { call, takeLatest, put } from 'redux-saga/effects';
import { LOGIN_REQUEST, LOGIN_FAIL, LOGIN_SUCCESS } from '../constants/actions';
import firebase from 'react-native-firebase';

export function* watcherSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}

function* loginSaga({ payload }) {
  const user = yield call(
    [
      firebase.auth(),
      'signInAndRetrieveDataWithEmailAndPassword'
    ],
    payload.email,
    payload.password
  );

  yield put({ type: LOGIN_SUCCESS, user })
}