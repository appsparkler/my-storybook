import React from 'react'
import 'webrtc-adapter'

function handleSuccess({ videoRef }, stream) {
  videoRef.current.srcObject = stream
}

function handleError(err) {
  console.error(err)
}

function startVideo(videoRef) {
  const constraints = {
    audio: false,
    video: true,
  }
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(handleSuccess.bind(null, { videoRef }))
    .catch(handleError)
}

function componentDidMount({ videoRef }) {
  startVideo(videoRef)
}

function clickPhoto({ videoRef, setDataURL }, evt) {
  evt.stopPropagation()
  const canvas = document.createElement('canvas')
  const canvasContext = canvas.getContext('2d')
  canvas.width = videoRef.current.videoWidth * 1
  canvas.height = videoRef.current.videoHeight * 1
  canvas.style.display = 'none'
  canvasContext.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
  const dataURL = canvas.toDataURL()
  setDataURL(dataURL)
}

export default () => {
  const [dataURL, setDataURL] = React.useState(null)
  //
  const videoRef = React.useRef()
  const canvasRef = React.useRef()
  //
  React.useEffect(
    componentDidMount.bind(null, {
      videoRef,
    }),
    []
  )
  return {
    videoRef,
    canvasRef,
    clickPhoto: clickPhoto.bind(null, { videoRef, setDataURL }),
    dataURL,
  }
}
