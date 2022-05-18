// Esse reducer será responsável por tratar as informações da pessoa usuária
import { USER_FORM } from '../actions/index';

const INITIAL_STATE = {
  email: '',
};

function UserReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_FORM:
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
}

export default UserReducer;
