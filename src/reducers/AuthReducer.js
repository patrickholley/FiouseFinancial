import {
  CLEAR_AUTH_ERROR,
  LOGIN_RESPONSE,
  LOGIN_ERROR,
  RESTORE_USER,
  LOGOUT_RESPONSE,
} from '../constants/actions';

const INITIAL_STATE = { user: null };

export default(state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLEAR_AUTH_ERROR:
      return { ...state, authError: '' };
    case LOGIN_RESPONSE:
      return { ...state, user: action.user };
    case LOGIN_ERROR:
      return { ...state, authError: action.authError };
    case LOGOUT_RESPONSE:
      return { ...state, user: null };
    case RESTORE_USER:
      return { ...state, user: action.payload.user };
    default:
      return state;
  }
};
