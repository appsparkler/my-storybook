import React from 'react'
import PropTypes from 'prop-types'
import { ChoiceGroup, Stack } from 'office-ui-fabric-react'

const options = [
  { key: 'file', text: 'Upload from file', iconProps: { iconName: 'Upload' } },
  { key: 'webcam', text: 'Use webcam', iconProps: { iconName: 'Webcam2' } },
]

const MediaSourceForm = ({
  disabled,
  mediaSource,
  handleMediaSourceChange,
}) => (
  <Stack.Item align="end">
    <ChoiceGroup
      disabled={disabled}
      label="Choose Source"
      options={options}
      selectedKey={mediaSource}
      onChange={handleMediaSourceChange}
    />
  </Stack.Item>
)

MediaSourceForm.propTypes = {
  mediaSource: PropTypes.string,
  handleMediaSourceChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default React.memo(MediaSourceForm)
