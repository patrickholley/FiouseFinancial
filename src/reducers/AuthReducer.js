import {
  CLEAR_CLIENT_MESSAGE,
  LOGIN_RESPONSE,
  LOGIN_ERROR,
  RESTORE_USER,
  LOGOUT_RESPONSE,
} from '../constants/actions';

const INITIAL_STATE = { user: null };

export default(state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLEAR_CLIENT_MESSAGE:
      return { ...state, clientMessage: null };
    case LOGIN_RESPONSE:
      return { ...state, user: action.user };
    case LOGIN_ERROR:
      return { ...state, clientMessage: action.clientMessage };
    case LOGOUT_RESPONSE:
      return { ...state, user: null };
    case RESTORE_USER:
      return { ...state, user: action.payload.user };
    default:
      return state;
  }
};
