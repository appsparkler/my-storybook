import React from 'react'
import useFileInput from '@react-hfn-hooks/useFileInput'
import useFileUploadButton from '@react-hfn-hooks/useFileUploadButton'
import useFileFromStorageRef from '@react-hfn-hooks/useFileFromStorageRef'
import uploadFile from '@react-hfn-hooks/uploadFile'

function componentDidMount({verifyFile}) {
  verifyFile()
}

function uploadedDidChange({verifyFile, uploaded}) {
  if (uploaded) verifyFile()
}

function fileDidChange({
  file,
  storageRef,
  setProgress,
  setError,
  setIsUploading,
  setUploaded,
}) {
  if (file) {
    uploadFile({
      file,
      storageRef,
      setProgress,
      setError,
      setIsUploading,
      setUploaded,
    })
  }
}

function firebaseFileDidChange({setBtnText, firebaseFile}) {
  if (firebaseFile) setBtnText('Edit File')
  else setBtnText('UploadFile')
}

export default ({storageRef}) => {
  const [firebaseFile, setFirebaseFile] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [file, setFile] = React.useState(null)
  const [isVerifying, setIsVerifying] = React.useState(false)
  const [uploaded, setUploaded] = React.useState(false)
  const [isUploading, setIsUploading] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [btnText, setBtnText] = React.useState('')
  //
  const {handleFileInputChange} = useFileInput({setFile})
  const {handleUploadButtonClick} = useFileUploadButton({
    storageRef,
    file,
    setIsUploading,
    setProgress,
    setUploaded,
    setError,
  })
  const {verifyFile} = useFileFromStorageRef({
    storageRef,
    setFile: setFirebaseFile,
    setIsVerifying,
  })
  //
  React.useEffect(
      componentDidMount.bind(null, {
        verifyFile,
      }),
      [],
  )
  React.useEffect(
      uploadedDidChange.bind(null, {
        verifyFile,
        uploaded,
      }),
      [uploaded],
  )
  React.useEffect(
      firebaseFileDidChange.bind(null, {
        setBtnText,
        firebaseFile,
      }),
      [firebaseFile],
  )
  React.useEffect(
      fileDidChange.bind(null, {
        file,
        storageRef,
        setProgress,
        setError,
        setIsUploading,
        setUploaded,
      }),
      [file],
  )
  //
  return {
    handleFileInputChange,
    isUploading,
    error,
    uploaded,
    progress,
    handleUploadButtonClick,
    isVerifying,
    firebaseFile,
    btnText,
  }
}
