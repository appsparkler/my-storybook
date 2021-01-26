import React from 'react'
import GoalForTheDayForm from '../'

const Story = {
  component: GoalForTheDayForm,
  title: 'Apps/Punch Card App/Punch Card/Goal For The Day - Version 0',
}

export const Template = (args) => <GoalForTheDayForm {...args} />
Template.args = {
  hours: '09',
  minutes: '00',
}
Template.args = {
  ...Template.args,
}
Template.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  },
}

export const Desktop = Template.bind({})
Desktop.args = {
  ...Template.args,
}

export default Story
