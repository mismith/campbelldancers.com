import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import firebaseui from 'firebaseui';

export const config = {
  apiKey: 'AIzaSyBigtmOtRfTMkGCaPw6riKG_qYFzK5XUps',
  authDomain: 'campbell-dancers.firebaseapp.com',
  databaseURL: 'https://campbell-dancers.firebaseio.com',
  projectId: 'campbell-dancers',
  // storageBucket: 'campbell-dancers.appspot.com',
  // messagingSenderId: '396059565913',
};
export const idKey = '.key';
export { firebase, firebaseui };
export const firebaseApp = firebase.initializeApp(config);
export const firebaseuiApp = new firebaseui.auth.AuthUI(firebase.auth());

export const ENV = process.env.NODE_ENV || 'production';
export const db = firebaseApp.database().ref(`${ENV}/data`);
export const dba = firebaseApp.database().ref(`${ENV}/admin`);

export function relate(a, b) {
  const A = {
    path: '',
    value: a.id,
    ...a,
  };
  const B = {
    path: '',
    value: b.id,
    ...b,
  };

  return Promise.all([
    firebase.database().ref(`${A.path}/${A.collection}/${A.id}/@${B.collection}/${B.id}`).set(B.value),
    firebase.database().ref(`${B.path}/${B.collection}/${B.id}/@${A.collection}/${A.id}`).set(A.value),
  ]);
}
export function unrelate(a, b) {
  return relate({
    ...a,
    value: null,
  }, {
    ...b,
    value: null,
  });
}

export function sync(path, value) {
  return firebase.database().ref(path).set(value);
}
