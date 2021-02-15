import React from 'react'
import useFileDownloader from './useFileDownloader'

const FileDownloader = ({ filePath }) => {
  const { downloadFile, isDownloading } = useFileDownloader()
  const onClick = React.useCallback(async () => {
    await downloadFile(filePath)
  }, [downloadFile, filePath])
  return (
    <button onClick={onClick} disabled={isDownloading}>
      {isDownloading ? 'Downloading...' : 'Open/Download File'}
    </button>
  )
}

export default React.memo(FileDownloader)
