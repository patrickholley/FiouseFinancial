import {
  CLEAR_AUTH_ERROR,
  LOGIN_RESPONSE,
  LOGIN_ERROR,
} from '../constants/actions';

const INITIAL_STATE = { user: null }

export default(state = INITIAL_STATE, action) => {
  switch(action.type) {
    case CLEAR_AUTH_ERROR:
      return { ...state, authError: '' };
    case LOGIN_RESPONSE:
      return { ...state, user: action.user };
    case LOGIN_ERROR:
      return { ...state, authError: action.authError };
    default:
      return state;
  }
};