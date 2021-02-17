import React from 'react'
import useFileRemover from './useFileRemover'

const FileRemover = ({ filePath, docPath }) => {
  const { removeFile, removingFiles } = useFileRemover({
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
      disabled={removingFiles.length}
      type="button"
    >
      {!removingFiles.length
        ? 'Remove File'
        : `Removing ${removingFiles.length} file(s)`}
    </button>
  )
}

export default React.memo(FileRemover)
