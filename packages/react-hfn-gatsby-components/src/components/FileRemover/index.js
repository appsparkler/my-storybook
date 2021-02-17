import React from 'react'
import useFileRemover from './useFileRemover'

const FileRemover = ({ filePath, docPath }) => {
  const { removeFile, removingFileList } = useFileRemover({
    onError: (err) => console.log(err),
  })
  const onClickDeleteFile = React.useCallback(
    async (evt) => {
      await removeFile({
        filePath,
        docPath,
      })
    },
    [filePath, docPath, removeFile]
  )
  return (
    <button
      onClick={onClickDeleteFile}
      disabled={removingFileList.length}
      type="button"
    >
      {!removingFileList.length
        ? 'Remove File'
        : `Removing ${removingFileList.length} file(s)`}
    </button>
  )
}

export default React.memo(FileRemover)
