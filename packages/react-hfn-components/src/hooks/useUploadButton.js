import { dataURL2Blob } from '@react-hfn-utils'

function onStateChange({ setProgress }, snapshot) {
  const { state, totalBytes, bytesTransferred } = snapshot
  if (totalBytes && state === 'running') {
    const progress = (bytesTransferred / totalBytes) * 100
    setProgress(progress)
  }
}

function onError() {}

function onDoneCallback({ setProgress, setUploaded, setIsUploading }) {
  setUploaded(true)
  setIsUploading(false)
}

function handleClick(
  { storageRef, croppedDataURL, setIsUploading, setProgress, setUploaded },
  evt
) {
  if (evt.target.disabled) return false
  setIsUploading(true)
  setUploaded(false)
  setProgress(0)
  const blob = dataURL2Blob(croppedDataURL)
  const file = new File([blob], 'pic')
  const uploadTask = storageRef.put(file)
  uploadTask.on(
    'state_changed',
    onStateChange.bind(null, { setProgress }),
    onError,
    onDoneCallback.bind(null, {
      setProgress,
      setUploaded,
      setIsUploading,
    })
  )
}

export default ({
  storageRef,
  croppedDataURL,
  setIsUploading,
  setProgress,
  setUploaded,
}) => {
  return {
    handleUploadButtonClick: handleClick.bind(null, {
      storageRef,
      croppedDataURL,
      setIsUploading,
      setProgress,
      setUploaded,
    }),
  }
}
