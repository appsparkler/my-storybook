import React from 'react'
import {Stack, ChoiceGroup} from 'office-ui-fabric-react'
import PropTypes from 'prop-types'

const CameraChoiceGroup = ({options, selectedKey, onChange}) => (
  <Stack.Item align="center">
    <ChoiceGroup
      label="Select Camera"
      options={options}
      selectedKey={selectedKey}
      onChange={onChange}
    />
  </Stack.Item>
)

CameraChoiceGroup.propTypes = {
  options: PropTypes.array,
  selectedKey: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export default CameraChoiceGroup
