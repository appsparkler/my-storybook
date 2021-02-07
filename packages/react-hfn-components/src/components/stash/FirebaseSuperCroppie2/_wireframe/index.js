import React from 'react'
import {Stack} from 'office-ui-fabric-react'
import ProfilePhoto from './ProfilePhoto'
import {ModalBasicExample} from './FabricModal'
import {CroppiePlaceholder} from './CroppiePlaceholder'

const WireFrame = () => {
  return (
    <Stack horizontalAlign="center" vertical gap="20" wrap>
      <ProfilePhoto />
      <ModalBasicExample />
      <CroppiePlaceholder />
    </Stack>
  )
}

export default WireFrame
