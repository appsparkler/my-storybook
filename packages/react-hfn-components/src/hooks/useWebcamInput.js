async function startVideo({webcamRef}) {
  try {
    const video = webcamRef.current
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    })
    video.srcObject = stream
    video.play()
  } catch (e) {
    console.error(e)
  }
}

function clickPhoto({webcamRef, setDataURL}, evt) {
  evt.stopPropagation()
  const canvas = document.createElement('canvas')
  const canvasContext = canvas.getContext('2d')
  canvas.width = webcamRef.current.videoWidth * 1
  canvas.height = webcamRef.current.videoHeight * 1
  canvas.style.display = 'none'
  canvasContext.drawImage(webcamRef.current, 0, 0, canvas.width, canvas.height)
  const dataURL = canvas.toDataURL()
  setDataURL(dataURL)
}

function stopVideo({webcamRef}) {
  if (!webcamRef?.current) return
  const stopTrack = (track) => track.stop()
  webcamRef.current.srcObject.getVideoTracks().forEach(stopTrack)
}

export default ({webcamRef, setDataURL}) => {
  return {
    startVideo: startVideo.bind(null, {webcamRef}),
    clickPhoto: clickPhoto.bind(null, {webcamRef, setDataURL}),
    stopVideo: stopVideo.bind(null, {webcamRef}),
  }
}
