// Coloque aqui suas actions
export const USER_FORM = 'USER_FORM';
export const GET_CURR = 'GET_CURR';
export const REQUEST_API = 'REQUEST_API';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const getUser = (email) => ({
  type: USER_FORM,
  email,
});

export const requestAPI = () => ({ type: REQUEST_API });

export const getCurr = (payload) => ({
  type: GET_CURR,
  payload,
});

export const addExpanse = (payload) => ({
  type: ADD_EXPENSE,
  payload,
});

export const editExpenseAction = (payload) => ({
  type: EDIT_EXPENSE,
  payload,
});

export const deleteExpenseAction = (payload) => ({
  type: DELETE_EXPENSE,
  payload,
});

export function fetchAPICurr() {
  return async (dispatch) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      const resultAll = Object.keys(data);
      const result = resultAll.filter((curr) => curr !== 'USDT');
      dispatch(getCurr(result));
    } catch (error) {
      console.log(error);
    }
  };
}

export async function fetchAPI() {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  delete data.USDT;
  return data;
}

export function addExpanseThunk(payload) {
  return async (dispatch) => {
    try {
      // dispatch(requestAPI());
      const exchangeRates = await fetchAPI();
      // const exchangeRates = await result.json();
      dispatch(addExpanse({ ...payload, exchangeRates }));
    } catch (error) {
      console.log(error);
    }
  };
}
