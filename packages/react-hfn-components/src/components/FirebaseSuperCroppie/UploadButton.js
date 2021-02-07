import React from 'react'
import PropTypes from 'prop-types'
import {DefaultButton} from 'office-ui-fabric-react'

const UploadButton = ({onClick, disabled}) => {
  return (
    <DefaultButton
      onClick={onClick}
      disabled={disabled}
      primary
      text="Upload Photo"
    />
  )
}

UploadButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default React.memo(UploadButton)
