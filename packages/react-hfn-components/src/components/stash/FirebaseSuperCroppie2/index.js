import React from 'react'
import PropTypes from 'prop-types'
import { Stack } from 'office-ui-fabric-react'
import ProfilePhoto from './ProfilePhoto'
import PhotoProcessModal from './PhotoProcessModal'
import useFirebaseSuperCroppie from './useFirebaseSuperCroppie'
import useEventHandlers from './useEventHandlers'

const FirebaseSuperCroppie = () => {
  const state = useFirebaseSuperCroppie()
  const eventHandlers = useEventHandlers({ state })
  return (
    <Stack horizontalAlign="center" vertical gap="20" wrap>
      <ProfilePhoto {...state} {...eventHandlers} />
      <PhotoProcessModal {...state} {...eventHandlers} />
    </Stack>
  )
}

FirebaseSuperCroppie.propTypes = {
  onUpload: PropTypes.func.isRequired,
}

FirebaseSuperCroppie.defaultProps = {
  onUpload: () => {},
}

export default FirebaseSuperCroppie
