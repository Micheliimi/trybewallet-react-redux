// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURR } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURR:
    return {
      ...state,
      currencies: action.payload,
    };
  default:
    return state;
  }
}

export default walletReducer;
