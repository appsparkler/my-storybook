import firebase from 'firebase/app'
import 'firebase/storage'

const {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
} = process.env.STORYBOOK_FIREBASE_CONFIG

const firebaseConfig = {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
}

const FirebaseApp = firebase.initializeApp(firebaseConfig)

export default FirebaseApp
