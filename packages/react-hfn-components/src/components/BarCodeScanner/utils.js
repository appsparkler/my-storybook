import * as ZXing from '@zxing/library/esm'

export const stopScanning = ({ codeReader }) => {
  codeReader.reset()
}

export const getCodeReader = () => {
  return new ZXing.BrowserMultiFormatReader()
}

export const handleScanError = (err) => {
  if (err && !(err instanceof ZXing.NotFoundException)) {
    console.error(err)
    // document.getElementById('result').textContent = err
  }
}

export const startScanning = ({
  video,
  selectedDeviceKey,
  handleResult,
  codeReader,
}) => {
  codeReader.decodeFromVideoDevice(selectedDeviceKey, video, handleResult)

  console.log(`S
  tarted continous decode from camera with id ${selectedDeviceKey}`)
}

export const getVideoInputDevices = async (codeReader) => {
  try {
    const videoInputDevices = await codeReader.getVideoInputDevices()
    return videoInputDevices
  } catch (e) {
  } finally {
  }
}

//
// const codeReader = new ZXing.BrowserMultiFormatReader()
// console.log('ZXing code reader initialized')
// codeReader.getVideoInputDevices()
//     .then((videoInputDevices) => {
//       const sourceSelect = document.getElementById('sourceSelect')
//       selectedDeviceId = videoInputDevices[0].deviceId
//       if (videoInputDevices.length >= 1) {
//         videoInputDevices.forEach((element) => {
//           const sourceOption = document.createElement('option')
//           sourceOption.text = element.label
//           sourceOption.value = element.deviceId
//           sourceSelect.appendChild(sourceOption)
//         })
//
//         sourceSelect.onchange = () => {
//           selectedDeviceId = sourceSelect.value
//         }
//
//        const sourceSelectPanel =
// document.getElementById('sourceSelectPanel')
//         sourceSelectPanel.style.display = 'block'
//       }
//     })
