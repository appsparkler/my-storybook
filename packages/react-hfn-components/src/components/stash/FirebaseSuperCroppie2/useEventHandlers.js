import convertFileToDataURI from '@react-hfn-utils/convertFileToDataURI'

function handleFileLoad({ state }, evt) {
  state.setDataURI(evt.target.result)
  state.setSelectedPivotKey('croppie')
  setTimeout(() => {
    state.setSelectedPivotKey('')
  })
}

function handleFileInputChange({ state }, evt) {
  const file = evt.target.files[0]
  convertFileToDataURI(file, handleFileLoad.bind(null, { state }))
}

function handlePivotLinkClicked({ state }, evt) {
  debugger
}

export default ({ state }) => {
  return {
    onFileInputChange: handleFileInputChange.bind(null, { state }),
    onPivotLinkClicked: handlePivotLinkClicked.bind(null, { state }),
  }
}
