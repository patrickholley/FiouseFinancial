import { call, takeLatest, put } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';
import {
  LOGIN_REQUEST,
  NEW_ACCOUNT_REQUEST,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_RESPONSE,
  LOGOUT_RESPONSE,
  LOGOUT_REQUEST,
  NETWORK_ERROR,
  USER_RESPONSE,
} from '../constants/actions';
import userFriendlyErrors from '../constants/userFriendlyErrors';

function* authUserSaga({ type, payload }) {
  try {
    const firebaseAuthMethod = type === LOGIN_REQUEST
      ? 'signInAndRetrieveDataWithEmailAndPassword'
      : 'createUserWithEmailAndPassword';

    const authResult = yield call(
      [
        firebase.auth(),
        firebaseAuthMethod,
      ],
      payload.fields.email.value,
      payload.fields.password.value,
    );

    const user = type === LOGIN_REQUEST ? authResult.user : authResult;

    yield call([AsyncStorage, 'setItem'], 'user', JSON.stringify(user));

    yield put({ type: USER_RESPONSE, payload: { user } });
  } catch (authError) {
    const clientError = userFriendlyErrors[authError.code] || 'Something went wrong';
    yield put({ type: NETWORK_ERROR, payload: { clientError } });
  }
}

function* logoutSaga() {
  yield call([firebase.auth(), 'signOut']);
  yield call([AsyncStorage, 'removeItem'], 'user');
  yield put({ type: LOGOUT_RESPONSE });
}

function* resetPasswordSaga({ payload }) {
  try {
    yield call(
      [
        firebase.auth(),
        'sendPasswordResetEmail',
      ],
      payload.fields.email.value,
    );

    yield put({
      type: RESET_PASSWORD_RESPONSE,
      payload: { clientError: 'Please check your email for a link to reset your password' },
    });
  } catch (authError) {
    const clientError = userFriendlyErrors[authError.code] || 'Something went wrong';
    yield put({ type: NETWORK_ERROR, payload: { clientError } });
  }
}

export default function* watcherSaga() {
  yield takeLatest(LOGIN_REQUEST, authUserSaga);
  yield takeLatest(LOGOUT_REQUEST, logoutSaga);
  yield takeLatest(NEW_ACCOUNT_REQUEST, authUserSaga);
  yield takeLatest(RESET_PASSWORD_REQUEST, resetPasswordSaga);
}
