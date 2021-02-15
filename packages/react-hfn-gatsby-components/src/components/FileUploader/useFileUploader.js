import React from 'react'
import uuid from 'uuid'
import { useFirebase } from 'react-redux-firebase'

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

export default useFileUploader
