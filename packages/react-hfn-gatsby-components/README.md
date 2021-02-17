# React Redux Firebase Hooks

This objective of this module; `react-redux-firebase-hooks`, is to simplify the following operations:

1. Connecting to a Firestore collection
1. Uploading File(s)
1. Downloading File(s)
1. Removing File(s)
1. Managing files

## Pre-requisite

- We need to setup the `react-redux-firebase` provider as per [the documentation](http://react-redux-firebase.com/docs/getting_started.html).
- We also to setup `firebase/firestore` and `firebase/storage` as the metadata of the files stored in storage will be saved in a Firestore collection.
  So, if you have configured as per the react-redux-firebase-getting-started-guide; you need to include the following additional configuration:

```js
//...
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore' // since we need Firestore
import 'firebase/firestore' // we need firestore
import 'firebase/storage' // we need storage
//...
firebase.firestore() // initialize firestore too
//..
const rrfConfig = {
  useFirestoreForStorageMeta: true, // we will store meta in Firestore
}
//..
const rootReducer = combineReducers({
  //..
  firestore: firestoreReducer, // since we need Firestore
})
//...
const rrfProps = {
  //...
  createFirestoreInstance, // since we need Firestore
}
```

Here is the full configuration of the React-Redux-Firebase-Provider:
