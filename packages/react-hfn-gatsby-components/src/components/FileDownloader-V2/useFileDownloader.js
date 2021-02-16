import React from 'react'
import { useFirebase } from 'react-redux-firebase'

const useFileDownloader = () => {
  const firebase = useFirebase()
  const [{ isDownloading }, setState] = React.useState({
    isDownloading: false,
  })
  const downloadFile = React.useCallback(
    async (fullPath) => {
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
    isDownloading,
    downloadFile,
  }
}

export default useFileDownloader
