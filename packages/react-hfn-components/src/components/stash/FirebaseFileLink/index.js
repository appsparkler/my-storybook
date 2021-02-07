import React from 'react'
import PropTypes from 'prop-types'
import useFirebaseFileLink from './useFirebaseFileLink'
import FirebaseFileLink from '@react-hfn-hoc/FirebaseFileLink'

const UsedFirebaseFileLink = ({storageRef}) => {
  const config = useFirebaseFileLink({storageRef})
  return <FirebaseFileLink {...config} />
}

UsedFirebaseFileLink.propTypes = {
  storageRef: PropTypes.object.isRequired,
}

export default UsedFirebaseFileLink
