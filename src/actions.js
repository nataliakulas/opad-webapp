export const AUTH_USER = 'AUTH_USER';


export const setAuthUser = (state, action) => ({
  ...state,
  authUser: action.authUser
});