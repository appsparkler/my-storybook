import React from 'react'

export default ({ props }) => {
  const [selectedFile, setSelectedFile] = React.useState(null)
  const [croppie, setCroppie] = React.useState(null)
  const [exceedsMaxBytes, setExceedsMaxBytes] = React.useState(null)
  const [file2Upload, setFile2Upload] = React.useState(null)
  const [uploaded, setUploaded] = React.useState(false)
  const [isUploading, setIsUploading] = React.useState(false)
  const [downloadURL, setDownloadURL] = React.useState('')
  const [progress, setProgress] = React.useState(0)
  const photoPreviewRef = React.useRef()
  const croppieRef = React.useRef()
  return {
    ...props,

    // REFS
    photoPreviewRef,
    croppieRef,

    // STATES
    downloadURL,
    setDownloadURL,
    uploaded,
    setUploaded,
    progress,
    setProgress,
    isUploading,
    setIsUploading,
    selectedFile,
    setSelectedFile,
    croppie,
    setCroppie,
    exceedsMaxBytes,
    setExceedsMaxBytes,
    file2Upload,
    setFile2Upload,
  }
}
