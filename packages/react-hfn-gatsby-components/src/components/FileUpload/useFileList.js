import { useSelector } from 'react-redux'

const useFileList = (path) => {
  const files = useSelector(({ firestore: { data } }) => data[path])
  return {
    files,
  }
}

export default useFileList
