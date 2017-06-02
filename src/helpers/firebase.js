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

export function loadCollectionItems(collection = 'items') {
  return firebase.database().ref(collection).once('value')
    .then((itemsSnap) => {
      const items = itemsSnap.val();

      if (!items) return null;

      return Object.keys(items).map(key => ({
        [idKey]: key,
        ...items[key],
      }));
    });
}
export function loadItemCollectionItems(itemIds, collection = 'items') {
  return Promise.all(Object.keys(itemIds).map(itemId =>
    firebase.database().ref(`${collection}/${itemId}`).once('value')
      .then(itemSnap => prepareItem(itemSnap.val(), itemId)),
    ));
}

export function loadUserCollectionItems(collection = 'items', user = firebase.auth().currentUser) {
  const userId = user.uid;

  return firebase.database().ref(`users/${userId}/@${collection}`).once('value')
    .then((snap) => {
      const itemIds = snap.val();

      // @TODO: proper fallbacks
      if (!itemIds) return {};

      return loadItemCollectionItems(itemIds, collection);
    });
}

export function createOrUpdateUserCollectionItem(item, collection = 'items', user = firebase.auth().currentUser) {
  let itemId = item[idKey];
  const userId = user.uid;
  const cleanedItem = cleanItem(item);

  const promise = itemId ?
    firebase.database().ref(`${collection}/${itemId}`).update(cleanedItem) : // update
    firebase.database().ref(collection).push(cleanedItem); // create

  itemId = itemId || promise.key;
  return Promise.all([
    promise,
    firebase.database().ref(`users/${userId}/@${collection}/${itemId}`).set(itemId),
  ])
    .then(() => itemId);
}
export function createOrUpdateUserCollectionItems(items, collection = 'items', user = firebase.auth().currentUser) {
  return Promise.all(items.map(item => createOrUpdateUserCollectionItem(item, collection, user)));
}
