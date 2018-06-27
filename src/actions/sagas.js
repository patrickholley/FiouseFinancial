import { call, takeLatest, put } from 'redux-saga/effects';
import { LOGIN_REQUEST, LOGIN_RESPONSE, LOGIN_ERROR } from '../constants/actions';
import firebase from 'react-native-firebase';

export function* watcherSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}

function* loginSaga({ payload }) {
  try {
    const user = yield call(
      [
        firebase.auth(),
        'signInAndRetrieveDataWithEmailAndPassword'
      ],
      payload.email,
      payload.password
    );

    yield put({ type: LOGIN_RESPONSE, user });
  } catch (error) {
    console.error(error.code);
    yield put({ type: LOGIN_ERROR, error });
  }
}