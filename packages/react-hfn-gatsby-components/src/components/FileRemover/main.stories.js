import React from 'react'
import { useFirebase } from 'react-redux-firebase'

const useFileRemover = ({ onError = () => null }) => {
  const [{ removingFiles }, setState] = React.useState({
    removingFiles: [],
  })

  const firebase = useFirebase()

  const removeFile = React.useCallback(
    async ({ filePath, docPath }) => {
      try {
        setState((currentState) => ({
          ...currentState,
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
        }))
      }
    },
    [firebase, onError]
  )

  return {
    removeFile,
    removingFiles,
  }
}

const FileRemover = ({ filePath, docPath }) => {
  const { removeFile, removingFiles } = useFileRemover({
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
    <button
      onClick={onClickDeleteFile}
      disabled={removingFiles.length}
      type="button"
    >
      {!removingFiles.length
        ? 'Remove File'
        : `Removing ${removingFiles.length} file(s)`}
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
  filePath: '78575c8f-7ea5-4d2b-8e2a-99e768c0aed0-signature.svg',
  docPath: 'my-uploaded-files/6eOYT7uMlheF2DOxKnQW',
}

export const Example = Template.bind({})
Example.args = {
  ...Template.args,
}
