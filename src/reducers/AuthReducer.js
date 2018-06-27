import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from '../constants/actions';

const INITIAL_STATE = { user: null }

export default(state = INITIAL_STATE, action) => {
  switch(action.type) {
    case LOGIN_SUCCESS:
      return { ...state, user: action.user };
    case LOGIN_FAILURE:
      return { ...state, error: action.error };
    default:
      return state;
  }
};