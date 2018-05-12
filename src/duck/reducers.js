export const AUTH_USER = 'AUTH_USER';

export function sessionReducer(state = {authUser: null}, action) {
  switch (action.type) {
    case AUTH_USER : {
      return ({
        ...state,
        authUser: action.authUser
      });
    }
    default :
      return state;
  }
}


