import {
  CLEAR_CLIENT_ERROR,
  RESTORE_USER,
  LOGOUT_RESPONSE,
  NETWORK_ERROR,
  USER_RESPONSE,
} from '../constants/actions';

const INITIAL_STATE = { user: null };

export default(state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case CLEAR_CLIENT_ERROR:
      return { ...state, clientError: null, networkActionDone: false };
    case USER_RESPONSE:
      return { ...state, networkActionDone: true, user: payload.user };
    case NETWORK_ERROR:
      return { ...state, clientError: payload.clientError, networkActionDone: true };
    case LOGOUT_RESPONSE:
      return { ...state, user: null };
    case RESTORE_USER:
      return { ...state, user: payload.payload.user };
    default:
      return state;
  }
};
