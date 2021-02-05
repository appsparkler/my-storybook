function handleStateChange({ props }, snapshot) {
  if (snapshot.totalBytes) {
    props.setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
  }
}

function handleError() {}

async function handleDone({ props, task }) {
  setTimeout(() => {
    props.setProgress(100)
    props.setIsUploading(false)
    props.setUploaded(true)
  }, 1000)
  await task
  const downloadURL = await task.snapshot.ref.getDownloadURL()
  const {
    fullPath,
    contentType,
    name,
    size,
    timeCreated,
    updated,
  } = task.snapshot.metadata
  const payload = {
    downloadURL,
    fullPath,
    contentType,
    fileName: name,
    size,
    timeCreated,
    updated,
  }
  props.onUpload(payload)
  props.setDownloadURL(downloadURL)
}

async function uploadPhoto({ props }, evt) {
  evt.preventDefault()
  evt.stopPropagation()
  props.setProgress(0)
  props.setIsUploading(true)
  props.setUploaded(false)
  const { storageRef, file2Upload } = props
  const task = storageRef.put(file2Upload)
  task.on(
    'state_changed',
    handleStateChange.bind(null, { props }),
    handleError,
    handleDone.bind(null, { props, task })
  )
}

export default function ({ props }) {
  return {
    uploadPhoto: uploadPhoto.bind(null, { props }),
  }
}
