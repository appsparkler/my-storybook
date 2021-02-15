import React from 'react'
import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'

const Story = {
  title: 'Components/File List',
}

export default Story

const useFirestoreCollection = (collectionPath) => {
  useFirestoreConnect(() => [{ collection: collectionPath }])
  const selector = ({ firestore: { data } }) => data[collectionPath]
  const collection = useSelector(selector)
  return collection
}

const FileList = ({ collectionPath }) => {
  const collection = useFirestoreCollection(collectionPath)
  if (!collection) return null
  return Object.entries(collection).map(([, doc]) => (
    <pre>{JSON.stringify(doc, null, 2)}</pre>
  ))
}

const Template = (args) => <FileList {...args} />
Template.args = {}

export const Example = Template.bind({})
Example.args = {
  collectionPath: 'uploadedFiles',
}
