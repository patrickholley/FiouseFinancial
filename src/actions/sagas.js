import { call, takeLatest, put } from 'redux-saga/effects';
import {
  LOGIN_REQUEST,
  LOGIN_RESPONSE,
  LOGIN_ERROR,
  NEW_ACCOUNT_REQUEST,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_RESPONSE,
  RESET_PASSWORD_ERROR,
} from '../constants/actions';
import firebase from 'react-native-firebase';

export function* watcherSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
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
      payload.fields.password.value
    );

    yield put({ type: LOGIN_RESPONSE, user });
  } catch (authError) {
    yield put({ type: LOGIN_ERROR, authError});
  }
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

    yield put({ type: LOGIN_RESPONSE, user });
  } catch (authError) {
    yield put({ type: LOGIN_ERROR, authError});
  }
}

function* resetPasswordSaga({ payload }) {
  try {
    console.log('Reset email', payload.fields.email.value);

    const user = yield call(
      [
        firebase.auth(),
        'sendPasswordResetEmail'
      ],
      payload.fields.email.value,
      {
        handleCodeInApp: true,
        url: 'https://financialassistant-29177.firebaseapp.com',
        iOS: { bundleId: 'com.fiouse.fiousefinances' },
        android: { packageName: 'com.fiouse.fiousefinances' },
      }
    );

    console.log('user', user);

    yield put({ type: RESET_PASSWORD_RESPONSE, user });
  } catch (authError) {
    console.error(authError);
    // yield put({ type: RESET_PASSWORD_ERROR, authError});
  }
}
