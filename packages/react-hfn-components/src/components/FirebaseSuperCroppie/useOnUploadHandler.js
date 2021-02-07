const onUploadHandler = async ({storageRef, onUpload}) => {
  const downloadURL = await Promise.resolve(storageRef.getDownloadURL())
  const metadata = await storageRef.getMetadata()
  const fileInfo = {
    fileName: metadata.name,
    bytes: metadata.size,
    fullPath: metadata.fullPath,
    contentType: metadata.contentType,
    downloadURL,
  }
  onUpload(fileInfo)
}

export default ({onUpload, storageRef}) => {
  return {
    onUploadHandler: onUploadHandler.bind(null, {
      onUpload,
      storageRef,
    }),
  }
}
