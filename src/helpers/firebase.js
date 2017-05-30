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

export function loadItemCollectionItems(itemIds, collection = 'items') {
  return Promise.all(Object.keys(itemIds).map(itemId =>
    firebase.database().ref(`${collection}/${itemId}`).once('value')
      .then((itemSnap) => {
        const item = itemSnap.val();

        if (!item) return null;

        item[idKey] = itemId;
        return item;
      }),
    ));
}

export function loadUserCollectionItems(collection = 'items', user = firebase.auth().currentUser) {
  const userId = user.uid;

  return firebase.database().ref(`users:${collection}/${userId}`).once('value')
    .then((snap) => {
      const itemIds = snap.val();

      // @TODO: proper fallbacks
      if (!itemIds) return [];

      return loadItemCollectionItems(itemIds, collection);
    });
}

export function createOrUpdateUserCollectionItem(item, collection = 'items', user = firebase.auth().currentUser) {
  const userId = user.uid;
  const preparedItem = { ...item };

  if (item[idKey]) {
    // update
    const itemId = item[idKey];
    delete preparedItem[idKey];

    return firebase.database().ref(`${collection}/${itemId}`).update(preparedItem);
  }

  // create
  // @TODO do proper grouped async here
  const itemId = firebase.database().ref(collection).push(preparedItem).key;
  return firebase.database().ref(`users:${collection}/${userId}/${itemId}`).set(itemId);
}
export function createOrUpdateUserCollectionItems(items, collection = 'items', user = firebase.auth().currentUser) {
  return Promise.all(items.map(item => createOrUpdateUserCollectionItem(item, collection, user)));
}
