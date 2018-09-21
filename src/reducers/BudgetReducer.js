import { fromJS } from 'immutable';
import { SAVE_BUDGET_RESPONSE, RESTORE_BUDGETS, SAVE_EXPENSE_RESPONSE } from '../constants/actions';

const INITIAL_STATE = fromJS({ budgets: {}, expenses: {} });

export default(state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case SAVE_BUDGET_RESPONSE:
      return state.merge({ budgets: payload.budgets });
    case SAVE_EXPENSE_RESPONSE:
      return state.merge({ expenses: payload.expenses });
    case RESTORE_BUDGETS:
      return state.merge({ budgets: payload.budgets, expenses: payload.expenses });
    default:
      return state;
  }
};
