import React from 'react'
import BarCodeScannerWireframe from '@react-hfn-components/BarCodeScanner/_wireframe'
import BarCodeScanner from '@react-hfn-components/BarCodeScanner'
import { initializeIcons } from '@uifabric/icons'
import 'office-ui-fabric-react/dist/css/fabric.min.css'

initializeIcons()

export default {
  title: 'Bar Code Scanner',
}

export const Component = () => {
  return (
    <BarCodeScanner
      onNewCodeDetected={(result) => {
        console.log(result)
      }}
    />
  )
}

export const wireframe = () => {
  return <BarCodeScannerWireframe />
}
