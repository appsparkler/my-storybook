import React from 'react'
import PropTypes from 'prop-types'
import HOCFirebaseFileInput from './hoc'
import useFirebaseFileInput from './useFirebaseFileInput'

const FirebaseFileInput = ({ storageRef }) => {
  const config = useFirebaseFileInput({ storageRef })
  return <HOCFirebaseFileInput {...config} />
}

FirebaseFileInput.propTypes = {
  storageRef: PropTypes.object.isRequired,
}

export default FirebaseFileInput
