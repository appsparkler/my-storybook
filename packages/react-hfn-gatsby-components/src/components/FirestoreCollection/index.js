import React from 'react'
import PropTypes from 'prop-types'
import useFirestoreCollection from './useFirestoreCollection'

const DocJSON = ({ doc }) => <pre>{JSON.stringify(doc, null, 2)}</pre>

const FirestoreCollection = ({ collectionPath }) => {
  const collection = useFirestoreCollection(collectionPath)
  if (!collection) return null
  return Object.entries(collection).map(([id, doc]) => (
    <DocJSON key={id} doc={doc} />
  ))
}

FirestoreCollection.propTypes = {
  collectionPath: PropTypes.string,
}

export default React.memo(FirestoreCollection)
