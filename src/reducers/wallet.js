// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURR, ADD_EXPENSE, CHANGE_SUM_EXPENSES } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  sumExpenses: 0,
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURR:
    return {
      ...state,
      currencies: action.payload,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case 'UPDATE_EXPENSES':
    return {
      ...state,
      expenses: action.payload,
      sumExpenses: action.sum,
    };
  case CHANGE_SUM_EXPENSES:
    return {
      sumExpenses: action.payload,
    };
  default:
    return state;
  }
}

export default walletReducer;
