import {AUTH_USER, GET_ITEMS, REMOVE_ITEM, SET_PATH, GET_FAV_ITEMS, TOGGLE_FAV_ITEM} from './actions';

export function sessionReducer(state = {authUser: null}, action) {
  switch (action.type) {
    case AUTH_USER : {
      return {
        ...state,
        authUser: action.payload
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
    case GET_FAV_ITEMS: {
      return {
        ...state,
        items: action.payload
      };
    }
    case REMOVE_ITEM: {
      const name = action.payload;
      const items = [];

      state.items.forEach(item => {
        if (name !== item.name) {
          items.push(item)
        }
      });

      return {
        ...state,
        items: items
      }
    }
    case TOGGLE_FAV_ITEM: {
      const name = action.payload;
      const fav = action.data;
      const items = [];

      state.items.forEach(item => {
        if (item.name === name) {
          item.fav = fav;
        }
        items.push(item)
      });

      return {
        ...state,
        items: items
      }
    }
    default:
      return state;
  }
}

export function pathReducer(state = {path: ''}, action) {
  switch (action.type) {
    case SET_PATH: {
      return {
        ...state,
        path: action.payload
      }
    }
    default:
      return state;
  }
}

