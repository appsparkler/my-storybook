import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

const {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
} = JSON.parse(process.env.STORYBOOK_FIREBASE_CONFIG)

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

export const putFile = (ref, file) => FirebaseApp.storage().ref(ref).put(file)
