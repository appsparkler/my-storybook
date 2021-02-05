import React from 'react'
import PropTypes from 'prop-types'
import FirebaseFileLink from '@app/legacy/FirebaseFileLink'
import CompositeFileInput from './CompositeFileInput'
import useFirebaseFileInput from './useFirebaseFileInput'

const FirebaseFileInput = (props) => {
  const upgradedProps = useFirebaseFileInput(props)
  return (
    <div>
      {props.readOnly && <FirebaseFileLink {...upgradedProps} />}
      {!props.readOnly && <CompositeFileInput {...upgradedProps} />}
    </div>
  )
}

FirebaseFileInput.propTypes = {
  readOnly: PropTypes.bool.isRequired,
}

export default FirebaseFileInput
