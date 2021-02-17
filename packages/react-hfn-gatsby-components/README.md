# React Redux Firebase Hooks

This objective of this module; `react-redux-firebase-hooks`, is to simplify the following operations:

1. Connecting to a Firestore collection
1. Uploading File(s)
1. Downloading File(s)
1. Removing File(s)
1. Managing files

## Pre-requisite

- We need to setup the `react-redux-firebase` provider as per [the documentation](http://react-redux-firebase.com/docs/getting_started.html).
- We would also setup `firebase/firestore` and `firebase/storage` as the metadata of the files stored in storage will be saved in a Firestore collection.
  So, if you have configured as per the [react-redux-firebase-getting-started-guide](http://react-redux-firebase.com/docs/getting_started.html); you need to include the following additional configuration:

```js
// additional configuration (if not already setup)
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore' // since we need Firestore
import 'firebase/firestore' // we need firestore
import 'firebase/storage' // we need storage
//...
firebase.firestore() // initialize firestore
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

```js
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore' // we need firestore to store the files meta
import 'firebase/storage' // we need storage to store the files
import { createStore, combineReducers, compose } from 'redux'
import {
  ReactReduxFirebaseProvider,
  firebaseReducer
} from 'react-redux-firebase'
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore'

const fbConfig = {}

// react-redux-firebase config
const rrfConfig = {
  // userProfile: 'users'
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  // enableClaims: true // Get custom claims along with the profile
  useFirestoreForStorageMeta: true,
}

// Initialize firebase instance
firebase.initializeApp(fbConfig)

// Initialize other services on firebase instance
firebase.firestore() // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable

// Add firebase to reducers
const rootReducer = combineReducers({
  // firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
})

// Create store with reducers and initial state
const initialState = {}
const store = createStore(rootReducer, initialState)

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
  createFirestoreInstance // <- needed if using firestore
}

// Setup react-redux so that connect HOC can be used
function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <FileManagerComponent />
      </ReactReduxFirebaseProvider>
    </Provider>
  )
}

render(<App />, document.getElementById('root'))
```
