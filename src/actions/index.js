// Coloque aqui suas actions
export const USER_FORM = 'USER_FORM';
export const GET_CURR = 'GET_CURR';
export const REQUEST_API = 'REQUEST_API';

export const getUser = (email) => ({
  type: USER_FORM,
  email,
});

export const requestAPI = () => ({ type: REQUEST_API });

export const getCurr = (payload) => ({
  type: GET_CURR,
  payload,
});

export function fetchAPICurr() {
  return async (dispatch) => {
    try {
      dispatch(requestAPI());
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      console.log(data);
      const resultAll = Object.keys(data);
      const result = resultAll.filter((curr) => curr !== 'USDT');
      console.log(result);
      dispatch(getCurr(result));
    } catch (error) {
      console.log(error);
    }
  };
}
