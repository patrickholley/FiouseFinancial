import { SAVE_BUDGET_RESPONSE, RESTORE_BUDGETS } from '../constants/actions';

const INITIAL_STATE = { budgets: [] };

export default(state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case SAVE_BUDGET_RESPONSE: {
      // cloning array to force update in navigationDrawer
      const budgets = payload.budgets.slice(0);
      return { ...state, budgets };
    }
    case RESTORE_BUDGETS: {
      const budgets = payload.budgets
        .filter(budget => budget.userId === payload.user.uid);

      console.log(budgets, payload.budgets);

      return { ...state, budgets };
    }
    default:
      return state;
  }
};
