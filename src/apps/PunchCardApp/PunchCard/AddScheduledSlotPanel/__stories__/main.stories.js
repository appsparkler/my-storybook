import React from 'react'
import AddScheduledSlotPanel from '../'

const Story = {
  title: 'Apps/Punch Card App/Punch Card/Add Add ScheduledSlot Panel',
  component: AddScheduledSlotPanel
}

export const Template = (args) => <AddScheduledSlotPanel {...args} />
Template.args = {
  isOpen: false
}
Template.parameter = {
  viewport: {
    defaultViewport: 'mobile1'
  }
}

export default Story
