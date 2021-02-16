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

export default React.memo(FileRemover)
