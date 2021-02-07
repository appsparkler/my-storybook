export default function convertFile2DataURL(file, cb) {
  const reader = new FileReader()
  reader.addEventListener('load', cb)
  reader.readAsDataURL(file)
}
