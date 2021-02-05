export default async function checkForWebcam({ valueSetter }) {
  try {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    })
    if (mediaStream) valueSetter(true)
    else valueSetter(false)
    const stopTrack = (track) => track.stop()
    mediaStream.getVideoTracks().forEach(stopTrack)
  } catch (e) {
    valueSetter(false)
  }
}
