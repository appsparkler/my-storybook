import React from 'react'
import { useFirebase } from 'react-redux-firebase'
import uuid from 'uuid'

const FileUploader = ({
  path = 'uploadedFiles',
  onError = () => null,
  collectionPath = 'unnamed-collection',
}) => {
  const [state, setState] = React.useState({
    isUploading: false,
  })
  const firebase = useFirebase()
  const uploadFiles = React.useCallback(
    (evt) => {
      setState((currentState) => ({
        ...currentState,
        isUploading: true,
      }))
      const { files } = evt.target
      const modFiles = [...files].map((file) => ({
        ...file,
        name: `${uuid.v4()}-${file.name}`,
      }))
      firebase
        .uploadFiles(path, modFiles, collectionPath)
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
    [firebase, path, onError, collectionPath]
  )
  return (
    <div>
      <input type="file" onChange={uploadFiles} />
      {state.isUploading && 'Uploading...'}
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
  path: 'test-123/bacd/12323ss',
  collectionPath: 'my-files/new',
}

export const Example = Template.bind({})
Example.args = {
  ...Template.args,
}
