import React from 'react'
import TextFieldWithCallout from '..'

const Template = (args) => <TextFieldWithCallout {...args} />
Template.args = {
  isDisabled: false,
  items: [],
}

export const example = Template.bind({})
example.args = Template.args

const Story = {
  title: 'Components/TextField With Callout',
  component: TextFieldWithCallout,
}

export default Story
