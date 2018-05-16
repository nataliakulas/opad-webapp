import {db, storage} from './config';

// User API
export const createUser = (id, name, email, items) =>
  db.ref(`${id}`).set({
    name,
    email: email,
    items: items
  });

export const createDbRef = (item_url, name, uid) => {
  storage.ref(item_url)
    .getDownloadURL()
    .then(url => {
      if (name) {
        db.ref(`${uid}/items/${name}`).set({
          url
        })
      }
    })
};

export const getDbRefs = (uid) =>
  db.ref(`${uid}/items`).once('value');