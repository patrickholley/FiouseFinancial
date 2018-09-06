import { call, put } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';
import {
  LOGIN_REQUEST,
  RESET_PASSWORD_RESPONSE,
  LOGOUT_RESPONSE,
  NETWORK_ERROR,
  USER_RESPONSE,
  RESTORE_BUDGETS,
} from '../constants/actions';
import userFriendlyErrors from '../constants/userFriendlyErrors';

export function* authUserSaga({ type, payload }) {
  try {
    const firebaseAuthMethod = type === LOGIN_REQUEST
      ? 'signInAndRetrieveDataWithEmailAndPassword'
      : 'createUserWithEmailAndPassword';

    const authResult = yield call(
      [
        firebase.auth(),
        firebaseAuthMethod,
      ],
      payload.fields.getIn(['email', 'value']),
      payload.fields.getIn(['password', 'value']),
    );

    const user = type === LOGIN_REQUEST ? authResult.user : authResult;

    yield call([AsyncStorage, 'setItem'], 'user', JSON.stringify(user));

    yield put({ type: USER_RESPONSE, payload: { user } });
  } catch (authError) {
    const clientError = userFriendlyErrors[authError.code] || 'Something went wrong';
    yield put({ type: NETWORK_ERROR, payload: { clientError } });
  }
}

export function* logoutSaga() {
  yield call([firebase.auth(), 'signOut']);
  yield call([AsyncStorage, 'multiRemove'], ['user', 'budgets']);
  yield put({ type: LOGOUT_RESPONSE });
  yield put({ type: RESTORE_BUDGETS, payload: { budgets: {} } });
}

export function* resetPasswordSaga({ payload }) {
  try {
    yield call(
      [
        firebase.auth(),
        'sendPasswordResetEmail',
      ],
      payload.fields.getIn(['email', 'value']),
    );

    yield put({ type: RESET_PASSWORD_RESPONSE });
  } catch (authError) {
    const clientError = userFriendlyErrors[authError.code] || 'Something went wrong';
    yield put({ type: NETWORK_ERROR, payload: { clientError } });
  }
}
