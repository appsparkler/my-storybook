import React from 'react'
import FileDownloader from '.'

const Story = {
  title: 'Components/File Downloader - V2',
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
