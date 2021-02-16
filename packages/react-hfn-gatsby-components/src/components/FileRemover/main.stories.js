import React from 'react'
// import useFileUploader from '../FileUploader/useFileUploader'
// import useFirestoreCollection from '../FirestoreCollection/useFirestoreCollection'
// import useFileDownloader from '../FileDownloader/useFileDownloader'
import { useFirebase } from 'react-redux-firebase'

const useFileRemover = ({ onError = () => null }) => {
  const [{ removingFiles, isRemoving }, setState] = React.useState({
    removingFiles: [],
    isRemoving: false,
  })

  const firebase = useFirebase()

  const removeFile = React.useCallback(
    async ({ filePath, docPath }) => {
      try {
        setState((currentState) => ({
          ...currentState,
          isRemoving: true,
          removingFiles: (() => {
            const updatedFiles = [...currentState.removingFiles]
            updatedFiles.push({ docPath, filePath })
            return updatedFiles
          })(),
        }))
        await firebase.deleteFile(filePath, docPath)
      } catch (e) {
        onError(e)
      } finally {
        setState((currentState) => ({
          ...currentState,
          removingFiles: (() => {
            return [
              ...currentState.removingFiles.filter((obj) => {
                return obj.docPath !== docPath && obj.filePath !== filePath
              }),
            ]
          })(),
          isRemoving: false,
        }))
      }
    },
    [firebase, onError]
  )

  return {
    removeFile,
    removingFiles,
    isRemoving,
  }
}

const FileRemover = ({ filePath, docPath }) => {
  const { removeFile, removingFiles, isRemoving } = useFileRemover({
    onError: (err) => console.log(err),
  })
  const onClickDeleteFile = React.useCallback(
    async (evt) => {
      await removeFile({
        filePath,
        docPath,
      })
    },
    [filePath, docPath, removeFile]
  )
  return (
    <button onClick={onClickDeleteFile} disabled={isRemoving} type="button">
      {!isRemoving && 'Remove File'}
      {isRemoving && `Removing ${removingFiles.length} file(s)`}
    </button>
  )
}

const Story = {
  title: 'Components/File Remover',
  component: FileRemover,
}

export default Story

const Template = (args) => <FileRemover {...args} />
Template.args = {
  filePath: 'my-uploaded-files',
  docPath: '',
}

export const Example = Template.bind({})
Example.args = {
  ...Template.args,
}
