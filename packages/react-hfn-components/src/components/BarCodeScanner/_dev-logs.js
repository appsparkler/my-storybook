import React from 'react'
import PropTypes from 'prop-types'
import {Stack, TextField} from 'office-ui-fabric-react'

const DevLogs = ({scanResult, devices, selectedDeviceKey}) => (
  <Stack.Item>
    <pre>
      {devices.length && (
        <TextField
          label="Devices"
          autoAdjustHeight
          value={JSON.stringify(devices)}
        />
      )}
      {selectedDeviceKey && (
        <TextField
          label="Selected Device"
          autoAdjustHeight
          value={JSON.stringify(selectedDeviceKey)}
        />
      )}
      {scanResult && (
        <TextField
          label="Scan Result"
          multiline
          autoAdjustHeight
          value={JSON.stringify(scanResult)}
        />
      )}
    </pre>
  </Stack.Item>
)

DevLogs.propTypes = {
  scanResult: PropTypes.object,
  devices: PropTypes.array,
  browser: PropTypes.string,
  selectedDeviceKey: PropTypes.string,
}

export default DevLogs
