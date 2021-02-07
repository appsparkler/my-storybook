import React from 'react'

async function verifyFile({props}) {
  try {
    props.setIsVerifying(true)
    const downloadURL = await props.storageRef.getDownloadURL()
    const metadata = await props.storageRef.getMetadata()
    props.setIsVerifying(false)
    props.setFile({
      fileName: metadata.customMetadata.fileName,
      bytes: metadata.size,
      fullPath: metadata.fullPath,
      contentType: metadata.contentType,
      downloadURL,
    })
  } catch (e) {
    props.setIsVerifying(false)
  }
}

function componentDidMount({props}) {
  verifyFile({props})
}

export default (props) => {
  React.useEffect(componentDidMount.bind(null, {props}), [])
  return {
    ...props,
  }
}
