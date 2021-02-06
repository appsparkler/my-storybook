import React from 'react'
import { useSelector } from 'react-redux'
import { useFirebase, useFirestoreConnect } from 'react-redux-firebase'

const useFileUpload = ({ path }) => {
  const [state, setState] = React.useState({
    isUploading: false,
    isDeleting: false,
  })
  useFirestoreConnect(() => [{ collection: path }])
  const firebase = useFirebase()
  const uploadedFiles = useSelector(({ firestore: { data } }) => data[path])
  const onFilesDrop = React.useCallback(
    (files) => {
      try {
        setState((currentState) => ({
          ...currentState,
          isUploading: true,
        }))
        firebase
          .uploadFiles(path, files, path)
          .then((res) => {
            setState((currentState) => ({
              ...currentState,
              isUploading: false,
            }))
          })
          .catch(console.error)
          .finally(console.log)
      } catch (e) {
        console.log({ e })
      } finally {
        console.log('DONE')
      }
    },
    [firebase, path]
  )
  const onFileDelete = React.useCallback(
    (file, key) => {
      setState((currentState) => ({
        ...currentState,
        isDeleting: true,
      }))
      return firebase
        .deleteFile(file.fullPath, `${path}/${key}`)
        .then((res) => {
          setState((currentState) => ({
            ...currentState,
            isDeleting: false,
          }))
        })
    },
    [firebase, path]
  )

  return {
    ...state,
    onFilesDrop,
    onFileDelete,
    uploadedFiles,
  }
}

export default useFileUpload
