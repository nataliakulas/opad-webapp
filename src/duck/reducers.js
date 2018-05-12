import {AUTH_USER} from './actions.js'
import {setAuthUser} from './actions.js'

export function sessionReducer(state = {authUser: null}, action) {
  switch (action.type) {
    case AUTH_USER : {
      return setAuthUser(state, action);
    }
    default :
      return state;
  }
}


