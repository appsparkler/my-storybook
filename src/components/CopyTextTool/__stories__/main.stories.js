import React from 'react'
import {CopyTextTool} from '../'
import { action } from '@storybook/addon-actions'

const Template = (args) => {
  return <CopyTextTool
    {...args}
  />
}

export const Example = Template.bind({});
Example.args = {
  text:"Hello World",
  // onClickCopy: () => null
}

export default {
  title: 'Components/CopyTextTool',
  description: 'An input field to quickly copy the value  to clipboard.',
  component: CopyTextTool,
  argTypes: {
    onClickCopy: {
      action: 'on-click-copy'
    }
  }
}
