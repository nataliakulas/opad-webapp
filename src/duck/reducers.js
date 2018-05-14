import {AUTH_USER, GET_ITEMS} from './actions';

export function sessionReducer(state = {authUser: null}, action) {
  switch (action.type) {
    case AUTH_USER : {
      return {
        ...state,
        authUser: action.authUser
      };
    }
    default :
      return state;
  }
}

export function itemsReducer(state = {items: []}, action) {
  switch (action.type) {
    case GET_ITEMS: {
      return {
        ...state,
        items: action.payload
      };
    }
    default:
      return state;
  }
}


