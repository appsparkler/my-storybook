import * as React from 'react'
import { Stack, DefaultButton } from 'office-ui-fabric-react'
import PropTypes from 'prop-types'
import CameraChoiceGroup from './CameraChoiceGroup'
import CameraStreamVideo from './CameraStreamVideo'
import useBarCodeScanner from '@react-hfn-components/BarCodeScanner/useBarCodeScanner'

const Scanner = ({ onNewCodeDetected }) => {
  const {
    videoRef,
    devices,
    selectedDeviceKey,
    handleDeviceChange,
    startScan,
    stopScan,
  } = useBarCodeScanner({ onNewCodeDetected })
  return (
    <>
      <Stack
        horizontalAlign="center"
        tokens={{
          childrenGap: 10,
          padding: 5,
        }}
      >
        <CameraStreamVideo videoRef={videoRef} />
        <CameraChoiceGroup
          options={devices}
          selectedKey={selectedDeviceKey}
          onChange={handleDeviceChange}
        />
        <DefaultButton onClick={startScan} primary text="Scan" />
        <DefaultButton onClick={stopScan} danger text="Stop Scan" />
      </Stack>
    </>
  )
}

Scanner.propTypes = {
  selectedDeviceKey: PropTypes.string,
  selectedPivotKey: PropTypes.string,
  devices: PropTypes.object,
  startScan: PropTypes.func,
  stopScan: PropTypes.func,
  handleDeviceChange: PropTypes.func,
  closeModal: PropTypes.func,
  setAbhyasiID: PropTypes.func,
  videoRef: PropTypes.shape({
    current: PropTypes.any,
  }),
  onNewCodeDetected: PropTypes.func,
  scanResult: PropTypes.object,
}

Scanner.defaultconfig = {
  onNewCodeDetected: () => {},
}

export default Scanner
