import React from 'react'
import PropTypes from 'prop-types'
import useFirebaseSuperCroppie from './useFirebaseSuperCroppie'
import FirebaseSuperCroppie from './hoc'

const UseFirebaseSuperCroppie = ({ storageRef, croppieConfig }) => {
  const value = useFirebaseSuperCroppie({ storageRef, croppieConfig })
  return <FirebaseSuperCroppie {...value} />
}

UseFirebaseSuperCroppie.propTypes = {
  storageRef: PropTypes.object.isRequired,
  croppieConfig: PropTypes.object.isRequired,
}

UseFirebaseSuperCroppie.defaultProps = {
  croppieConfig: {
    viewport: { width: 200, height: 200 },
    boundary: { width: 300, height: 300 },
  },
}

export default UseFirebaseSuperCroppie
