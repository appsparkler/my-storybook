import React from 'react'
import AddScheduledSlotButton from '../'

const Story = {
  title: 'Buttons/Add Scheduled Slot',
  component: AddScheduledSlotButton
}

const Template = (args) => <AddScheduledSlotButton {...args} />
Template.args = {
  show: true
}

export const SmallMobile = Template.bind({});
SmallMobile.args = {...Template.args}
SmallMobile.parameters = {
  viewport: {
    defaultViewport: 'mobile1'
  }
}

export default Story
