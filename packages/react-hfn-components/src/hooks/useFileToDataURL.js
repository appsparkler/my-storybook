function handleFileLoaded({ setDataURL }, evt) {
  const dataURL = evt.target.result
  setDataURL(dataURL)
}

async function convertFile2DataURL({ setDataURL, file }) {
  const reader = new FileReader()
  reader.addEventListener('load', handleFileLoaded.bind(null, { setDataURL }))
  reader.readAsDataURL(file)
}

export default ({ file, setDataURL }) => {
  return {
    convertFile2DataURL: convertFile2DataURL.bind(null, { file, setDataURL }),
  }
}
