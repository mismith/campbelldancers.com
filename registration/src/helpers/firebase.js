import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import firebaseui from 'firebaseui';

export const config = {
  apiKey: 'AIzaSyBigtmOtRfTMkGCaPw6riKG_qYFzK5XUps',
  authDomain: 'campbell-dancers.firebaseapp.com',
  databaseURL: 'https://campbell-dancers.firebaseio.com',
  projectId: 'campbell-dancers',
  //storageBucket: 'campbell-dancers.appspot.com',
  //messagingSenderId: '396059565913',
};
export { firebase, firebaseui };
export const firebaseApp = firebase.initializeApp(config);
export const firebaseuiApp = new firebaseui.auth.AuthUI(firebase.auth());
