// http://react-redux-firebase.com/docs/getting_started.html
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore' // <- needed if using firestore
// import 'firebase/functions' // <- needed if using httpsCallable
import 'firebase/storage'

import {
  ReactReduxFirebaseProvider,
  // firebaseReducer,
} from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore' // <- needed if using firestore
import store from './store'

const fbConfig = JSON.parse(process.env.STORYBOOK_FIREBASE_CONFIG)

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  // enableClaims: true // Get custom claims along with the profile
}

// Initialize firebase instance
firebase.initializeApp(fbConfig)

// Initialize other services on firebase instance
firebase.firestore() // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable

// Add firebase to reducers
// const rootReducer = combineReducers({
//   firebase: firebaseReducer,
//   firestore: firestoreReducer, // <- needed if using firestore
// })

// Create store with reducers and initial state
const initialState = {
  data: {},
}
const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
}

export default (Story) => (
  <ReactReduxFirebaseProvider {...rrfProps}>
    <Story />
  </ReactReduxFirebaseProvider>
)
