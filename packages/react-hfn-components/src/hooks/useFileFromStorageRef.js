async function verifyFile({storageRef, setFile, setIsVerifying}) {
  try {
    setIsVerifying(true)
    const downloadURL = await storageRef.getDownloadURL()
    const metadata = await storageRef.getMetadata()
    const file = {
      fileName: metadata?.customMetadata?.fileName || 'file',
      bytes: metadata.size,
      fullPath: metadata.fullPath,
      contentType: metadata.contentType,
      downloadURL,
    }
    setFile(file)
  } catch (e) {
    setFile(null)
  } finally {
    setIsVerifying(false)
  }
}

export default ({storageRef, setFile, setIsVerifying}) => {
  return {
    verifyFile: verifyFile.bind(null, {storageRef, setFile, setIsVerifying}),
  }
}
