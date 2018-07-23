import { call, takeLatest, put } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import {
  LOGIN_REQUEST,
  LOGIN_RESPONSE,
  LOGIN_ERROR,
  NEW_ACCOUNT_REQUEST,
  NEW_ACCOUNT_RESPONSE,
  NEW_ACCOUNT_ERROR,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_RESPONSE,
  RESET_PASSWORD_ERROR,
  LOGOUT_RESPONSE,
  LOGOUT_ERROR,
  LOGOUT_REQUEST,
} from '../constants/actions';
import firebase from 'react-native-firebase';

export function* watcherSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(LOGOUT_REQUEST, logoutSaga);
  yield takeLatest(NEW_ACCOUNT_REQUEST, newAccountSaga);
  yield takeLatest(RESET_PASSWORD_REQUEST, resetPasswordSaga);
}

function* loginSaga({ payload }) {
  try {
    const user = yield call(
      [
        firebase.auth(),
        'signInAndRetrieveDataWithEmailAndPassword'
      ],
      payload.fields.email.value,
      payload.fields.password.value,
    );

    yield call(
      [
        AsyncStorage,
        'setItem'
      ],
      'user',
      JSON.stringify(user),
    );

    yield put({ type: LOGIN_RESPONSE, user });
  } catch (authError) {
    yield put({ type: LOGIN_ERROR, authError});
  }
}

function* logoutSaga({ payload }) {
  const user = yield call(
    [
      firebase.auth(),
      'signOut'
    ],
  );

  yield call(
    [
      AsyncStorage,
      'removeItem'
    ],
    'user',
  );

  yield put({ type: LOGOUT_RESPONSE, user });
}

function* newAccountSaga({ payload }) {
  try {
    const user = yield call(
      [
        firebase.auth(),
        'createUserWithEmailAndPassword'
      ],
      payload.fields.email.value,
      payload.fields.confirmEmail.value,
    );

    yield put({ type: NEW_ACCOUNT_RESPONSE, user });
  } catch (authError) {
    yield put({ type: NEW_ACCOUNT_ERROR, authError});
  }
}

function* resetPasswordSaga({ payload }) {
  try {
    const user = yield call(
      [
        firebase.auth(),
        'sendPasswordResetEmail'
      ],
      payload.fields.email.value,
    );

    yield put({ type: RESET_PASSWORD_RESPONSE, user });
  } catch (authError) {
    yield put({ type: RESET_PASSWORD_ERROR, authError});
  }
}
