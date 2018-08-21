import { SAVE_BUDGET_RESPONSE, RESTORE_BUDGETS } from '../constants/actions';

const INITIAL_STATE = { budgets: {} };

export default(state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case SAVE_BUDGET_RESPONSE:
      return { ...state, budgets: payload.budgets };
    case RESTORE_BUDGETS:
      return { ...state, budgets: payload.budgets };
    default:
      return state;
  }
};
