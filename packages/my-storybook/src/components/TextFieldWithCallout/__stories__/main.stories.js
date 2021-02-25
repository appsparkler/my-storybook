import React from 'react'
import TimezoneTextField from '..'

const Template = (args) => <TimezoneTextField {...args} />
Template.args = {
  isDisabled: false,
  items: [],
}

export const example = Template.bind({})
example.args = Template.args

const Story = {
  title: 'Components/TextField With Callout',
  component: TimezoneTextField,
}

export default Story
