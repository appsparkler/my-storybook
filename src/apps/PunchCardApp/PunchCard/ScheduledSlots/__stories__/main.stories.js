import React from 'react'
import ScheduledSlots from '..'

const Story = {
  title: 'Apps/Punch Card App/Punch Card/Scheduled Slots',
  component: ScheduledSlots
}

export const Template = (args) => <ScheduledSlots {...args} />
Template.args = {
  items: [{
      id: 'ae084dcd-d3c6-4749-8815-bc505987aaf3',
      inTime: 1606887000000,
      outTime: 1606890600000
    },{
    id: 'd47fcf33-bf96-4f16-8158-b21d78017300',
    inTime: 1606894200000,
    outTime: 1606897800000
  }]
}

export default Story
