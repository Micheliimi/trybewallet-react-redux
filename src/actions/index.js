// Coloque aqui suas actions
export const USER_FORM = 'USER_FORM';

export const getUser = (email) => ({
  type: USER_FORM,
  email,
});
