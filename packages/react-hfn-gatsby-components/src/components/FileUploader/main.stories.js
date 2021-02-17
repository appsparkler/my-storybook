import React from 'react'
import useFileUploader from './useFileUploader'

const Story = {
  title: 'Components/File Uploader',
}

export default Story

const Template = ({
  storagePath = 'uploadedFiles',
  onError = () => null,
  collectionPath = 'unnamed-collection',
}) => {
  const { uploadFiles, isUploading } = useFileUploader({
    onError: (err) => console.error(err),
    storagePath,
    collectionPath,
  })
  const onChange = React.useCallback(
    (evt) => {
      const { files } = evt.target
      uploadFiles(files)
    },
    [uploadFiles]
  )
  return (
    <div>
      <input type="file" onChange={onChange} />
      {isUploading && 'Uploading...'}
    </div>
  )
}
Template.args = {
  storagePath: 'new-storage-path/abcd-xyz',
  collectionPath: 'my-super-storage-files',
}

export const Example = Template.bind({})
Example.args = {
  ...Template.args,
}
