import React from 'react'

async function setDownloadURLOnState({ props }) {
  try {
    const downloadURL = await props.storageRef.getDownloadURL()
    props.setDownloadURL(downloadURL)
  } catch (e) {}
}

function componentDidMount({ props }) {
  setDownloadURLOnState({ props })
}

export default ({ props }) => {
  React.useEffect(componentDidMount.bind(null, { props }), [])
  return {}
}
