import React from 'react'
import FileUploader from './FileUpload'

const Story = {
  title: 'components/File Upload',
  component: FileUploader,
}

const Template = (args) => <FileUploader {...args} />
Template.args = {
  path: 'abhyasiDocs/INAAE478/passport',
}

export const Example = Template.bind({})
Example.args = Template.args

export default Story
