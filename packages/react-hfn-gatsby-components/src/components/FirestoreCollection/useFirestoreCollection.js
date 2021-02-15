import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'

const useFirestoreCollection = (collectionPath) => {
  useFirestoreConnect(() => [{ collection: collectionPath }])
  const selector = ({ firestore: { data } }) => data[collectionPath]
  const collection = useSelector(selector)
  return collection
}

export default useFirestoreCollection
