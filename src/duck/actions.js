import {auth, db} from '../firebase/config';

export const AUTH_USER = 'AUTH_USER';
export const GET_ITEMS = 'GET ITEMS';
export const GET_FAV_ITEMS = 'GET ITEMS';
export const REMOVE_ITEM = 'REMOVE ITEM';
export const TOGGLE_FAV_ITEM = "TOGGLE_FAV_ITEM";
export const SET_PATH = 'SETH_PATH';


export const userAuth = (authUser) => ({type: AUTH_USER, payload: authUser});
export const setPath = (path) => ({type: SET_PATH, payload: path});
export const removeItem = (name) => ({type: REMOVE_ITEM, payload: name});
export const toggleFavItem = (name, fav) => ({type: TOGGLE_FAV_ITEM, payload: name, data: fav});


export function getItems() {
  if (auth.currentUser.uid) {
    return dispatch => {
      const items = [];

      db.ref(`${auth.currentUser.uid}/items`).once('value')
        .then((snap) => {
          if (snap) {
            snap.forEach(child => {
              let item = child.val();
              Promise
                .resolve(item.name = child.key).then(() => items.push(item))
            });
          }
        })
        .then(() => dispatch({type: GET_ITEMS, payload: items}));
    }
  }
}

export function getFavItems() {
  if (auth.currentUser.uid) {
    return dispatch => {
      const items = [];

      db.ref(`${auth.currentUser.uid}/items`).once('value')
        .then(snap => {
          snap.forEach(child => {
            let item = child.val();
            item.name = child.key;

            Promise.resolve(item.name = child.key).then(() => {
              if (item.fav) {
                items.push(item)
              }
            })
          });
        })
        .then(() => dispatch({type: GET_FAV_ITEMS, payload: items}));
    }
  }
}