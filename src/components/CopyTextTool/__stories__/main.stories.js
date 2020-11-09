import React from 'react'
import {CopyTextTool} from '../'

export default {
  title: 'Components/CopyTextTool',
  description: 'An input field to quickly copy the value  to clipboard.',
  component: CopyTextTool,
  argTypes: {}
}

const Template = (args) => {
  return <CopyTextTool
    {...args}
  />
}

export const Example = Template.bind({});
Example.args = {
  text:"Hello World",
  onClickCopy:() => alert('clicked copy')
}
