function onStateChange({ setProgress }, snapshot) {
  const { state, totalBytes, bytesTransferred } = snapshot
  if (totalBytes && state === 'running') {
    const progress = (bytesTransferred / totalBytes) * 100
    setProgress(progress)
  }
}

function onError({ setError }) {
  setError(new Error('Did not upload!'))
}

function onDoneCallback({ setProgress, setUploaded, setIsUploading }) {
  setUploaded(true)
  setIsUploading(false)
}

export default function uploadFile({
  file,
  storageRef,
  setProgress,
  setError,
  setIsUploading,
  setUploaded,
}) {
  if (!file) return setError(new Error('No File Selected'))
  setError(null)
  setIsUploading(true)
  setUploaded(false)
  setProgress(0)
  const uploadTask = storageRef.put(file, {
    customMetadata: {
      fileName: file.name,
    },
  })
  uploadTask.on(
    'state_changed',
    onStateChange.bind(null, { setProgress }),
    onError.bind(null, { setError }),
    onDoneCallback.bind(null, {
      setProgress,
      setUploaded,
      setIsUploading,
    })
  )
}
