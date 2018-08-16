import {
  CLEAR_NETWORK_ACTION,
  RESTORE_USER,
  LOGOUT_RESPONSE,
  NETWORK_ERROR,
  USER_RESPONSE,
  RESET_PASSWORD_RESPONSE,
} from '../constants/actions';

const INITIAL_STATE = { user: null };

export default(state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case CLEAR_NETWORK_ACTION:
      return {
        ...state,
        clientError: null,
        networkActionDone: false,
        showResetPasswordModal: false,
      };
    case USER_RESPONSE:
      return { ...state, networkActionDone: true, user: payload.user };
    case NETWORK_ERROR:
      return { ...state, clientError: payload.clientError, networkActionDone: true };
    case LOGOUT_RESPONSE:
      return { ...state, user: null };
    case RESET_PASSWORD_RESPONSE:
      return { ...state, networkActionDone: true, showResetPasswordModal: true };
    case RESTORE_USER:
      return { ...state, user: payload.user };
    default:
      return state;
  }
};
