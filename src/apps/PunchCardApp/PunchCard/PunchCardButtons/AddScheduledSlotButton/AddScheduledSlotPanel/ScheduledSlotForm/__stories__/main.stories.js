import React from 'react'
import ScheduledSlotForm from '../'

const Story = {
  title: 'Apps/Punch Card App/Punch Card/Punch Card Buttons/Add Scheduled Slot Panel/Scheduled Slot Form',
  component: ScheduledSlotForm
}

export default Story

const Template = (args) => <ScheduledSlotForm {...args} />
Template.args = {
  initialInTime: '2020-12-01 12:00',
  initialOutTime: '2020-12-01 13:00'
}

export const SmallMobile = Template.bind({});
SmallMobile.args = Template.args
SmallMobile.parameters = {
  viewport: {
    defaultViewport: 'mobile1'
  }
}

export const Desktop = Template.bind({});
Desktop.args = Template.args
