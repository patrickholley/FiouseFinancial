import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import BudgetReducer from './BudgetReducer';

export default combineReducers({
  auth: AuthReducer,
  budget: BudgetReducer,
});
