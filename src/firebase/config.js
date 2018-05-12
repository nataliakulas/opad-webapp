import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBXxnKfs9kPHBNBsfUyKCbiRgV44ts1sqo",
  authDomain: "opad-webapp.firebaseapp.com",
  databaseURL: "https://opad-webapp.firebaseio.com",
  projectId: "opad-webapp",
  storageBucket: "opad-webapp.appspot.com",
  messagingSenderId: "338631411191"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const auth = firebase.auth();
export const db = firebase.database();
export const storage = firebase.storage();

