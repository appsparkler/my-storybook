import React from 'react'
import { useFirebase } from 'react-redux-firebase'

const useFileDownload = ({ onError = () => {} } = {}) => {
  const [state, setState] = React.useState({
    isDownloading: false,
  })
  const firebase = useFirebase()
  const downloadFile = React.useCallback(
    async (path2File) => {
      try {
        setState((currentState) => ({
          ...currentState,
          isDownloading: true,
        }))
        const storageRef = firebase.storage().ref(path2File)
        const downloadUrl = await storageRef.getDownloadURL()
        Object.assign(document.createElement('a'), {
          target: '_blank',
          href: downloadUrl,
        }).click()
      } catch (e) {
        onError(e)
      } finally {
        setState((currentState) => ({
          ...currentState,
          isDownloading: true,
        }))
      }
    },
    [firebase, onError]
  )

  return {
    ...state,
    downloadFile,
  }
}

export default useFileDownload
