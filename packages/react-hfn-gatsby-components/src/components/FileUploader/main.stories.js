import React from 'react'
import { useFirebase } from 'react-redux-firebase'
import uuid from 'uuid'

const useFileUploader = ({ storagePath, collectionPath, onError }) => {
  const [state, setState] = React.useState({
    isUploading: false,
  })
  const firebase = useFirebase()
  const uploadFiles = React.useCallback(
    (files) => {
      setState((currentState) => ({
        ...currentState,
        isUploading: true,
      }))
      const filesWithUUID = [...files].map((file) => ({
        ...file,
        name: `${uuid.v4()}-${file.name}`,
      }))
      firebase
        .uploadFiles(storagePath, filesWithUUID, collectionPath)
        .catch((error) => {
          onError(error)
        })
        .finally(() => {
          setState((currentState) => ({
            ...currentState,
            isUploading: false,
          }))
        })
    },
    [firebase, storagePath, onError, collectionPath]
  )
  return {
    ...state,
    uploadFiles,
  }
}

const FileUploader = ({
  storagePath = 'uploadedFiles',
  onError = () => null,
  collectionPath = 'unnamed-collection',
}) => {
  const { uploadFiles, isUploading } = useFileUploader({
    onError: (err) => console.error(err),
    storagePath,
    collectionPath,
  })
  const onChange = React.useCallback(
    (evt) => {
      const { files } = evt.target
      uploadFiles(files)
    },
    [uploadFiles]
  )
  return (
    <div>
      <input type="file" onChange={onChange} />
      {isUploading && 'Uploading...'}
    </div>
  )
}

const Story = {
  title: 'Components/File Uploader',
  component: FileUploader,
}

export default Story

const Template = (args) => <FileUploader {...args} />
Template.args = {
  storagePath: 'new-storage-path/abcd-xyz',
  collectionPath: 'my-super-storage-files',
}

export const Example = Template.bind({})
Example.args = {
  ...Template.args,
}
