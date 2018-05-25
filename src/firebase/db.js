import {db, storage} from './config';

export const createUser = (id, name, email, items) =>
  db.ref(`${id}`).set({
    name,
    email: email,
    items: items
  });

export const createDbRef = (item_url, name, tag, fav, uid) => {
  storage.ref(item_url)
    .getDownloadURL()
    .then(url => {
      if (name) {
        db.ref(`${uid}/items/${name}`).set({url, tag, fav}, (error) => {
          if (error) {
            console.log("Picture adding failed")
          }
        })
      }
    })
};

export const getDbRefs = (uid) =>
  db.ref(`${uid}/items`).once('value');

export const removeDbRefs = (name, uid, callback) => {
  const storageRef = storage.ref().child(`${uid}/${name}`);

  storageRef.delete()
    .then(() => {
      db.ref(`${uid}/items/${name}`).remove()
        .catch(error => console.log(error))
    })
    .then(() => callback)
    .catch(error => console.log(error))
};

export const updateDbRefs = (name, fav, uid, callback) => {
  let update = {};
  update['fav'] = fav;

  db.ref(`${uid}/items/${name}`).update(update)
    .then(() => callback)
    .catch(error => console.log(error))
};