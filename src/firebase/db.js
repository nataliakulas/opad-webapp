import {db} from './config';

// User API
export const createUser = (id, email, pictures) =>
  db.ref(`${id}`).set({
    email,
    pictures
  });

export const createRef = (url, uid) => {
  const id = db.ref().child(`${uid}/pictures`).push().key;

  if (id) {
    db.ref(`${uid}/pictures/${id}`).set({
      url
    })
  }
};

export const getRefs =(uid)=>
  db.ref(`${uid}/pictures`).once('value');