import React from 'react'
import { useSelector } from 'react-redux'
import { useFirebase, useFirestoreConnect } from 'react-redux-firebase'

const useFileUpload = ({ path }) => {
  const [state, setState] = React.useState({
    isUploading: false,
    isDeleting: false,
    isDownloading: false,
  })
  useFirestoreConnect(() => [{ collection: path }])
  const firebase = useFirebase()
  const uploadedFiles = useSelector(({ firestore: { data } }) => data[path])
  const uploadFiles = React.useCallback(
    (files) => {
      try {
        const filteredFiles = (() => {
          if (!uploadedFiles) return files
          const uploadedFilesArray = Object.entries(uploadedFiles).map(
            ([key, val]) => val
          )
          return files.filter(
            (file) =>
              !uploadedFilesArray.some((file1) => file1.name === file.name)
          )
        })()
        setState((currentState) => ({
          ...currentState,
          isUploading: true,
        }))
        firebase
          .uploadFiles(path, filteredFiles, path)
          .then((res) => {
            setState((currentState) => ({
              ...currentState,
              isUploading: false,
            }))
          })
          .catch((err) => {
            console.error({ err })
          })
          .finally(() => {
            console.log('finally uploaded!')
          })
      } catch (err) {
        console.log({ caughtError: err })
      } finally {
        console.log('DONE')
      }
    },
    [firebase, path, uploadedFiles]
  )
  const resetIsDeleting = () =>
    setState((currentState) => ({
      ...currentState,
      isDeleting: false,
    }))
  const deleteFile = React.useCallback(
    (file, key) => {
      try {
        setState((currentState) => ({
          ...currentState,
          isDeleting: true,
        }))
        return firebase
          .deleteFile(file.fullPath, `${path}/${key}`)
          .then((res) => {
            resetIsDeleting()
          })
          .catch((err) => {
            console.error({ err })
          })
          .finally(() => {
            resetIsDeleting()
            console.log('finally deleted!')
          })
      } catch (e) {
        console.error({ caughtError: e })
      } finally {
      }
    },
    [firebase, path]
  )
  const onDownloadFile = React.useCallback(
    async (evt) => {
      const { fullPath } = evt.target.dataset
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
    [firebase]
  )
  return {
    ...state,
    onDownloadFile,
    uploadFiles,
    deleteFile,
    uploadedFiles,
  }
}

export default useFileUpload
