import React from 'react'
import FirebaseSuperCroppie from '@react-hfn-components/FirebaseSuperCroppie'
import config from './config'
import './styles'

const StudioApp = () => {
  return <FirebaseSuperCroppie storageRef={config.storageRef} />
}

export default StudioApp
