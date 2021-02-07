import React from 'react'

export default () => {
  const [dataURI, setDataURI] = React.useState()
  const [selectedPivotKey, setSelectedPivotKey] = React.useState()

  return {
    dataURI,
    setDataURI,
    selectedPivotKey,
    setSelectedPivotKey,
  }
}
