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
export const idKey = '.key';
export { firebase, firebaseui };
export const firebaseApp = firebase.initializeApp(config);
export const firebaseuiApp = new firebaseui.auth.AuthUI(firebase.auth());

export function cleanItem(item) {
  const cleanedItem = { ...item };

  delete cleanedItem[idKey];

  return cleanedItem;
}
export function prepareItem(item, id) {
  const preparedItem = { ...item };

  preparedItem[idKey] = id;

  return preparedItem;
}

export function relate(collectionA, idA, collectionB, idB, setIdA, setIdB) {
  return Promise.all([
    firebase.database().ref(`${collectionA}/${idA}/@${collectionB}/${idB}`).set(typeof setIdB !== 'undefined' ? setIdB : idB),
    firebase.database().ref(`${collectionB}/${idB}/@${collectionA}/${idA}`).set(typeof setIdA !== 'undefined' ? setIdA : idA),
  ]);
}
export function unrelate(collectionA, idA, collectionB, idB) {
  return relate(collectionA, idA, collectionB, idB, null, null);
}
