import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from '../constants/actions';

const INITIAL_STATE = { user: null, email: '', }

export default(state = INITIAL_STATE, action) => {
  switch(action.type) {
    default:
      return state;
  }
};