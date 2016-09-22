import firebase from 'firebase';
import Vue from 'vue';
import vuefire from 'vuefire';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyAsuYnePOSBVFKBJdOF8iEfuHiospa42OQ',
  authDomain: 'poolparty-ea8fc.firebaseapp.com',
  databaseURL: 'https://poolparty-ea8fc.firebaseio.com',
  storageBucket: 'poolparty-ea8fc.appspot.com',
};


firebase.initializeApp(config);

Vue.use(vuefire);

export default firebase;
export const database = firebase.database();
export const auth = firebase.auth();
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
