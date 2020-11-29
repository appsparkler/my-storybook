import React from 'react'
import GoalForTheDayForm from '../'

const Story = {
  component: GoalForTheDayForm,
  title: 'Forms/Goal For The Day'
}

const Template = (args) => <GoalForTheDayForm {...args} />
Template.args = {}

export const SmallMobile = Template.bind({})
SmallMobile.args = {
  ...Template.args
};
SmallMobile.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  }
}

export const Desktop = Template.bind({})
Desktop.args = {
  ...Template.args
};

export default Story