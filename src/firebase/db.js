import {db, storage} from './config';

// User API
export const createUser = (id, email, items) =>
  db.ref(`${id}`).set({
    email,
    items: items
  });

export const createDbRef = (itemUrl, name, uid) => {
  storage.ref(itemUrl)
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