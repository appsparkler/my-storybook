import React from 'react'
import useFileDownloader from './useFileDownloader'

const FileDownloader = ({ filePath }) => {
  const { downloadFile, downloadingFileList } = useFileDownloader()
  const onClick = React.useCallback(async () => {
    await downloadFile(filePath)
  }, [downloadFile, filePath])
  return (
    <button onClick={onClick} disabled={downloadingFileList.length}>
      {downloadingFileList.length
        ? `Downloading ${downloadingFileList.length} file...`
        : 'Open/Download File'}
    </button>
  )
}

export default React.memo(FileDownloader)
