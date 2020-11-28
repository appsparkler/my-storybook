import React from 'react'
import ScheduledSlotForm from '../'

const Story = {
  title: 'Forms/Scheduled Slot Form',
  component: ScheduledSlotForm
}

export default Story

const Template = (args) => <ScheduledSlotForm {...args} />
Template.args = {}

export const SmallMobile = Template.bind({});
SmallMobile.args = Template.args
SmallMobile.parameters = {
  viewport: {
    defaultViewport: 'mobile1'
  }
}
