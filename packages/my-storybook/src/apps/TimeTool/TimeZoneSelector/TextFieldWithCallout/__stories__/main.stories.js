import React from 'react'
import TimezoneTextField from '..'

const Template = (args) => <TimezoneTextField {...args} />
Template.args = {
  isDisabled: false,
}

export const example = Template.bind({})
example.args = Template.args

const Story = {
  title: 'Apps/Time Tool/Timezone Selector/Timezone Text Field',
  component: TimezoneTextField,
}

export default Story
