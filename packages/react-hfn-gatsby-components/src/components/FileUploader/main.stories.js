import React from 'react'
import FileUploader from '.'

const Story = {
  title: 'Components/File Uploader',
  component: FileUploader,
}

export default Story

const Template = (args) => <FileUploader {...args} />
Template.args = {
  storagePath: 'new-storage-path/abcd-xyz',
  collectionPath: 'my-super-storage-files',
}

export const Example = Template.bind({})
Example.args = {
  ...Template.args,
}
