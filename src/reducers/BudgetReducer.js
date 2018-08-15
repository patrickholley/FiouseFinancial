import { SAVE_BUDGET_RESPONSE, RESTORE_BUDGETS } from '../constants/actions';

const INITIAL_STATE = { user: null };

export default(state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case SAVE_BUDGET_RESPONSE:
      return state;
    case RESTORE_BUDGETS:
      return { ...state, budgets: payload.budgets };
    default:
      return state;
  }
};
