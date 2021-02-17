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

export default useFileRemover
