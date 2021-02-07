import React from 'react'

// TODO - stop-scanning when selected-device is changed
// TODO - rename onScan to onNewCodeDetected

import {
  getVideoInputDevices,
  startScanning,
  handleScanError,
  getCodeReader,
  stopScanning,
} from './utils'

function handleVideoInputDevices(
    {setDevices, setSelectedDevice},
    videoInputDevices,
) {
  setDevices(
      videoInputDevices.map((device) => ({
        key: device.deviceId,
        text: device.label,
      })),
  )
}

function componentDidMount({setDevices, setSelectedDevice, codeReader}) {
  getVideoInputDevices(codeReader).then(
      handleVideoInputDevices.bind(null, {
        setDevices,
        setSelectedDevice,
      }),
  )
}

function devicesDidChange({setSelectedDeviceKey, devices}) {
  if (!devices || devices.length === 0) return
  setSelectedDeviceKey(devices[0].key)
}

function handleScanResult(
    {setScanResult, codeReader, onNewCodeDetected},
    result,
    err,
) {
  if (result) {
    stopScanning({codeReader})
    setScanResult(result)
    onNewCodeDetected(result)
  } else if (err) {
    handleScanError(err)
  }
}

function handleDeviceChange({setSelectedDeviceKey}, evt, selectedOption) {
  setSelectedDeviceKey(selectedOption.key)
}

export default ({onNewCodeDetected}) => {
  const codeReader = getCodeReader()
  const [devices, setDevices] = React.useState([])
  const [selectedDeviceKey, setSelectedDeviceKey] = React.useState(undefined)
  const [scanResult, setScanResult] = React.useState(null)
  //
  const videoRef = React.useRef()
  //
  React.useEffect(
      componentDidMount.bind(null, {
        setDevices,
        codeReader,
      }),
      [],
  )
  React.useEffect(
      devicesDidChange.bind(null, {
        setSelectedDeviceKey,
        devices,
      }),
      [devices],
  )
  //
  return {
    devices,
    videoRef,
    selectedDeviceKey,
    scanResult,
    startScan: startScanning.bind(null, {
      codeReader,
      video: videoRef.current,
      selectedDeviceKey,
      handleResult: handleScanResult.bind(null, {
        setScanResult,
        codeReader,
        onNewCodeDetected,
      }),
    }),
    stopScan: stopScanning.bind(null, {codeReader}),
    saveResult: () => setScanResult(null),
    resetResult: () => setScanResult(null),
    handleDeviceChange: handleDeviceChange.bind(null, {setSelectedDeviceKey}),
  }
}
