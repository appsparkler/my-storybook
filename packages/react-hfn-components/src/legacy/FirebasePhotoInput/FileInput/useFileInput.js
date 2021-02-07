function handleFileLoaded({props}, evt) {
  evt.preventDefault()
  evt.stopPropagation()
  const result = evt.target.result
  const {setSelectedFile} = props
  setSelectedFile(result)
}

function handleChange({props}, evt) {
  evt.preventDefault()
  evt.stopPropagation()
  const {files} = evt.target
  const photo = files.item(0)
  if (photo) {
    const reader = new FileReader()
    reader.addEventListener('load', handleFileLoaded.bind(null, {props}))
    reader.readAsDataURL(photo)
  }
}

export default ({props}) => {
  return {
    handleChange: handleChange.bind(null, {props}),
  }
}
