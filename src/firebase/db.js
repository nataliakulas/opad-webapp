import {db} from './config';

// User API
export const createUser = (id, email) =>
  db.ref(`${id}`).set({
    email
  });