import FirebaseApp from '@react-hfn-studio/firebase-app'

const storageRef = FirebaseApp.storage().ref('INAAAEX32/profilePics2/')

export default {
  maxBytes: 2 * 1024 * 1024,
  storageRef,
  onUpload: (file) => {
    console.log(file)
  },
}
