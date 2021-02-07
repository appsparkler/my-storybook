import React from 'react'
import useFileFromStorageRef from '@react-hfn-hooks/useFileFromStorageRef'

function componentDidMount({verifyFile}) {
  verifyFile()
}

export default ({storageRef}) => {
  const [file, setFile] = React.useState(null)
  const [isVerifying, setIsVerifying] = React.useState(false)
  const {verifyFile} = useFileFromStorageRef({
    storageRef,
    setFile,
    setIsVerifying,
  })
  React.useEffect(
      componentDidMount.bind(null, {
        verifyFile,
      }),
      [],
  )
  return {
    isVerifying,
    file,
  }
}
