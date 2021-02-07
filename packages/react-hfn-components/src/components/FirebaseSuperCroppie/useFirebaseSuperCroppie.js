import React from 'react'
import useFileFromStorageRef from '@react-hfn-hooks/useFileFromStorageRef'
import useMediaSourceForm from '@react-hfn-hooks/useMediaSourceForm'
import useCroppie from '@react-hfn-hooks/useCroppie'
import useUploadButton from '@react-hfn-hooks/useUploadButton'
import useWebcamInput from '@react-hfn-hooks/useWebcamInput'
import useFileInput from '@react-hfn-hooks/useFileInput'
import useFileToDataURL from '@react-hfn-hooks/useFileToDataURL'
import checkForWebcam from '@react-hfn-utils/checkForWebcam'
import checkMobileDevice from '@react-hfn-utils/checkMobileDevice'
import useOnUploadHandler from './useOnUploadHandler'

function checkWebcamAvailability({setIsWebcamAvailable}) {
  checkForWebcam({
    valueSetter: setIsWebcamAvailable,
  })
}

function checkForMobileDevice({setIsMobileDevice}) {
  checkMobileDevice({
    valueSetter: setIsMobileDevice,
  })
}

function componentDidMount({
  verifyFile,
  setIsWebcamAvailable,
  setIsMobileDevice,
}) {
  verifyFile()
  checkWebcamAvailability({setIsWebcamAvailable})
  checkForMobileDevice({setIsMobileDevice})
}

function croppieDidChange({croppie, dataURL}) {
  if (!dataURL) return
  croppie.bind({
    url: dataURL,
  })
}

function dataURLDidChange({setupCroppie, croppie, dataURL}) {
  if (!croppie && dataURL) {
    setupCroppie()
  } else if (dataURL && croppie) {
    croppie.bind({
      url: dataURL,
    })
  }
}

function uploadedDidChange({
  uploaded,
  setCroppedDataURL,
  setDataURL,
  setMediaSource,
  setProgress,
  setUploaded,
  verifyFile,
  stopVideo,
  onUploadHandler,
}) {
  if (!uploaded) return
  onUploadHandler()
  stopVideo()
  setProgress(0)
  setUploaded(false)
  setCroppedDataURL(null)
  setDataURL(null)
  setMediaSource(null)
  verifyFile()
}

function mediaSourceDidChange({
  mediaSource,
  setDataURL,
  setCroppie,
  setCroppedDataURL,
  fileInputRef,
  startVideo,
  isMobileDevice,
}) {
  if (!mediaSource) {
    setDataURL(null)
    setCroppie(null)
    setCroppedDataURL(null)
  } else if (mediaSource === 'webcam' && !isMobileDevice) {
    startVideo()
  } else if (mediaSource === 'webcam' && isMobileDevice) {
    fileInputRef.current.click()
  } else if (mediaSource === 'file') {
    fileInputRef.current.click()
  }
}

function fileDidChange({file, setImgIsLoading}) {
  if (file && file.downloadURL) return setImgIsLoading(true)
  setImgIsLoading(false)
}

function handleLoad({file, setImgIsLoading}) {
  if (file && file.downloadURL) return setImgIsLoading(false)
}

function selectedFileDidChange({selectedFile, setSelectedFile, setDataURL}) {
  if (selectedFile) {
    const {convertFile2DataURL} = useFileToDataURL({
      file: selectedFile,
      setDataURL,
    })
    convertFile2DataURL()
  }
}

export default ({storageRef, croppieConfig, onUpload = () => {}}) => {
  const [imgIsLoading, setImgIsLoading] = React.useState(false)
  const [file, setFile] = React.useState(null)
  const [isVerifying, setIsVerifying] = React.useState(false)
  const [mediaSource, setMediaSource] = React.useState(null)
  const [dataURL, setDataURL] = React.useState(null)
  const [croppie, setCroppie] = React.useState(null)
  const [croppedDataURL, setCroppedDataURL] = React.useState(null)
  const [isUploading, setIsUploading] = React.useState(false)
  const [uploaded, setUploaded] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [selectedFile, setSelectedFile] = React.useState(null)
  const [isWebcamAvailable, setIsWebcamAvailable] = React.useState(false)
  const [isMobileDevice, setIsMobileDevice] = React.useState(false)
  //
  const croppieRef = React.useRef()
  const webcamRef = React.useRef()
  const fileInputRef = React.useRef()
  //
  const {verifyFile} = useFileFromStorageRef({
    setFile,
    setIsVerifying,
    storageRef,
  })
  const {resetMediaSource, handleMediaSourceChange} = useMediaSourceForm({
    valueSetter: setMediaSource,
  })
  const {handleFileInputChange} = useFileInput({
    setFile: setSelectedFile,
  })
  const {setupCroppie} = useCroppie({
    setCroppie,
    croppieRef,
    croppieConfig,
    setCroppedDataURL,
  })
  const {handleUploadButtonClick} = useUploadButton({
    croppedDataURL,
    storageRef,
    setIsUploading,
    setProgress,
    setUploaded,
  })
  const {clickPhoto, startVideo, stopVideo} = useWebcamInput({
    webcamRef,
    setDataURL,
  })
  const {onUploadHandler} = useOnUploadHandler({
    storageRef,
    onUpload,
  })

  React.useEffect(
      selectedFileDidChange.bind(null, {setDataURL, selectedFile}),
      [selectedFile],
  )
  React.useEffect(
      componentDidMount.bind(null, {
        verifyFile,
        setIsWebcamAvailable,
        setIsMobileDevice,
      }),
      [],
  )
  React.useEffect(
      mediaSourceDidChange.bind(null, {
        mediaSource,
        setDataURL,
        setCroppie,
        setCroppedDataURL,
        isMobileDevice,
        startVideo,
        fileInputRef,
      }),
      [mediaSource],
  )
  React.useEffect(
      dataURLDidChange.bind(null, {
        setupCroppie,
        croppie,
        dataURL,
      }),
      [dataURL],
  )
  React.useEffect(
      croppieDidChange.bind(null, {
        croppie,
        dataURL,
      }),
      [croppie],
  )
  React.useEffect(
      uploadedDidChange.bind(null, {
        uploaded,
        setCroppedDataURL,
        setDataURL,
        setMediaSource,
        setProgress,
        verifyFile,
        setUploaded,
        stopVideo,
        onUploadHandler,
      }),
      [uploaded],
  )
  React.useEffect(
      fileDidChange.bind(null, {
        setImgIsLoading,
        file,
      }),
      [file],
  )
  //
  return {
    file,
    isVerifying,
    mediaSource,
    handleFileInputChange,
    dataURL,
    webcamRef,
    clickPhoto,
    croppieRef,
    croppedDataURL,
    handleUploadButtonClick,
    isUploading,
    progress,
    uploaded,
    resetMediaSource,
    imgIsLoading,
    isWebcamAvailable,
    isMobileDevice,
    fileInputRef,
    handleMediaSourceChange: (...args) => {
      stopVideo()
      handleMediaSourceChange(...args)
    },
    handleLoad: handleLoad.bind(null, {file, setImgIsLoading}),
  }
}
