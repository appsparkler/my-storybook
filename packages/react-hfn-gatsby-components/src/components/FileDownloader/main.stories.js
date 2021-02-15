import React from 'react'
import { useFirebase } from 'react-redux-firebase'
import useFirestoreCollection from '../FirestoreCollection/useFirestoreCollection'

const FileDownloadWidget = ({ file: { fullPath, name } }) => {
  const firebase = useFirebase()
  const [{ isDownloading }, setState] = React.useState({
    isDownloading: false,
  })

  const onClick = React.useCallback(
    async (evt) => {
      setState((currentState) => ({
        ...currentState,
        isDownloading: true,
      }))
      const storageRef = firebase.storage().ref(fullPath)
      const downloadUrl = await storageRef.getDownloadURL()
      Object.assign(document.createElement('a'), {
        target: '_blank',
        href: downloadUrl,
      }).click()
      setState((currentState) => ({
        ...currentState,
        isDownloading: false,
      }))
    },
    [firebase, fullPath]
  )
  return (
    <pre>
      {name}
      <br />
      <button onClick={onClick}>Download/Open Files</button>
      &nbsp;
      {isDownloading && 'Downloading/Opening...'}
    </pre>
  )
}

const FileDownloader = () => {
  const files = useFirestoreCollection('uploadedFiles')
  if (!files) return null
  return Object.entries(files).map(([key, file]) => (
    <FileDownloadWidget file={file} />
  ))
}
const Story = {
  title: 'Components/File Downloader',
  component: FileDownloader,
}

export default Story

const Template = (args) => <FileDownloader {...args} />
Template.args = {
  storagePath: 'new-storage-path/abcd-xyz',
  collectionPath: 'my-sDowner-storage-files',
}

export const Example = Template.bind({})
Example.args = {
  ...Template.args,
}
