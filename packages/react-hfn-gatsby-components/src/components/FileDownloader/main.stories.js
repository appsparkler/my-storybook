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

const Story = {
  title: 'Components/File Downloader',
  component: FileDownloader,
}

export default Story

const Template = (args) => <FileDownloader {...args} />
Template.args = {
  filePath: 'uploadedFiles/522d2ac7-8e30-4c48-8747-41ca37bb76d7-env-with-auth',
}

export const Example = Template.bind({})
Example.args = {
  ...Template.args,
}
