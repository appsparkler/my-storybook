import React from 'react'
import PropTypes from 'prop-types'
import useFirebaseSuperCroppie from './useFirebaseSuperCroppie'
import FirebaseSuperCroppie from './hoc'

const UseFirebaseSuperCroppie = ({ storageRef, croppieConfig, onUpload }) => {
  const value = useFirebaseSuperCroppie({ storageRef, croppieConfig, onUpload })
  return <FirebaseSuperCroppie {...value} />
}

UseFirebaseSuperCroppie.propTypes = {
  storageRef: PropTypes.object.isRequired,
  croppieConfig: PropTypes.object.isRequired,
  onUpload: PropTypes.func,
}

UseFirebaseSuperCroppie.defaultProps = {
  croppieConfig: {
    viewport: { width: 200, height: 200 },
    boundary: { width: 300, height: 300 },
  },
  onUpload: (file) => {},
}

export default React.memo(UseFirebaseSuperCroppie)
