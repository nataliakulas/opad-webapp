import {db, storage} from './config';

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
        db.ref(`${uid}/items/${name}`).set({url}, (error) => {
          if (error) {
            console.log("Picture adding failed")
          }
        })
      }
    })
};

export const getDbRefs = (uid) =>
  db.ref(`${uid}/items`).once('value');

export const removeDbRefs = (name, uid) => {
  const storageRef = storage.ref().child(`${uid}/${name}`);

  storageRef.delete()
    .then(() => {
      db.ref(`${uid}/items/${name}`).remove()
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
};