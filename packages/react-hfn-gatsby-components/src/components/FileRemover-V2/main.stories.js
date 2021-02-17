import React from 'react'
import FileRemover from '.'
import useFileRemover from './useFileRemover'

const Story = {
  title: 'Hooks/File Manager/useFileRemover',
  component: FileRemover,
}

export default Story

const Template = ({ filePath, docPath }) => {
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
Template.args = {
  filePath: '78575c8f-7ea5-4d2b-8e2a-99e768c0aed0-signature.svg',
  docPath: 'my-uploaded-files/6eOYT7uMlheF2DOxKnQW',
}

export const Example = Template.bind({})
Example.args = {
  ...Template.args,
}
