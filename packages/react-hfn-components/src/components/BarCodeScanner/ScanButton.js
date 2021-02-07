import React from 'react'
import PropTypes from 'prop-types'
import {Stack, DefaultButton} from 'office-ui-fabric-react'

const ScanButton = ({onStartButtonClick, onStopButtonClick}) => (
  <Stack.Item align="center">
    <Stack horizontal tokens={{childrenGap: 10}}>
      <DefaultButton
        primary
        text="Start Scanning"
        onClick={onStartButtonClick}
      />
      <DefaultButton secondary text="Stop/Reset" onClick={onStopButtonClick} />
    </Stack>
  </Stack.Item>
)

ScanButton.propTypes = {
  onStartButtonClick: PropTypes.func.isRequired,
  onStopButtonClick: PropTypes.func.isRequired,
}

export default ScanButton
