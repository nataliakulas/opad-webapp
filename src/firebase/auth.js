import {auth} from './config';

// Register
export const registerUser = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

// Log In
export const logIn = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

// Password Reset
export const resetPassword = (email) =>
  auth.sendPasswordResetEmail(email);

// Password Update
export const updatePassword = (password) =>
  auth.currentUser.updatePassword(password);