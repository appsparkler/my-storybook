import React from 'react'
import PropTypes from 'prop-types'
import { Stack } from 'office-ui-fabric-react'
import CamVideo from './CamVideo'
import CameraChoiceGroup from './CameraChoiceGroup'
import ScanButton from './ScanButton'
// import ConfirmationLayer from './ConfirmationLayer'
import ResultModal from './ResultModal'
import useBarCodeScanner from './useBarCodeScanner'
import useBarCodeScannerUI from './useBarCodeScannerUI'
//
import DevLogs from './_dev-logs'

const BarCodeScanner = ({ onNewCodeDetected }) => {
  const {
    devices,
    videoRef,
    startScan,
    selectedDeviceKey,
    stopScan,
    scanResult /* saveResult, resetResult,*/,
    handleDeviceChange,
  } = useBarCodeScanner({ onNewCodeDetected })
  const { isModalOpen, closeModal } = useBarCodeScannerUI({ scanResult })
  return (
    <Stack
      align="center"
      tokens={{
        childrenGap: 20,
        padding: 10,
      }}
    >
      <CamVideo videoRef={videoRef} />
      <CameraChoiceGroup
        options={devices}
        selectedKey={selectedDeviceKey}
        onChange={handleDeviceChange}
      />
      <ScanButton onStartButtonClick={startScan} onStopButtonClick={stopScan} />
      {scanResult && (
        <ResultModal
          isOpen={isModalOpen}
          content={scanResult.text}
          closeModal={closeModal}
        />
      )}
      <DevLogs
        scanResult={scanResult}
        devices={devices}
        selectedDeviceKey={selectedDeviceKey}
      />
    </Stack>
  )
}

BarCodeScanner.propTypes = {
  onNewCodeDetected: PropTypes.func.isRequired,
}

BarCodeScanner.defaultProps = {
  onNewCodeDetected: () => {},
}

export default BarCodeScanner
