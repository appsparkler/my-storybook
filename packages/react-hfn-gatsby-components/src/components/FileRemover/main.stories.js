import React from 'react'
import FileRemover from '.'

const Story = {
  title: 'Components/File Remover',
  component: FileRemover,
}

export default Story

const Template = (args) => <FileRemover {...args} />
Template.args = {
  filePath: '78575c8f-7ea5-4d2b-8e2a-99e768c0aed0-signature.svg',
  docPath: 'my-uploaded-files/6eOYT7uMlheF2DOxKnQW',
}

export const Example = Template.bind({})
Example.args = {
  ...Template.args,
}
