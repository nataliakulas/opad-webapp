import {auth} from '../firebase/config';
import {getDbRefs} from '../firebase/db';

export const AUTH_USER = 'AUTH_USER';
export const GET_ITEMS = 'GET ITEMS';

export function getItems() {
  return dispatch => {
    const userId = auth.currentUser.uid;
    const items = [];

    getDbRefs(userId)
      .then(snap => {
        snap.forEach(child => {
          let item = child.val();
          item.name = child.key;

          items.push(item)
        });
      })
      .then(() => dispatch({type: GET_ITEMS, payload: items}));
  }
}