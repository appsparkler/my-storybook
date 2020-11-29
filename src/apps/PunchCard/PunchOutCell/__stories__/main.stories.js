import React from 'react'
import PunchOutTimeCell from '../'

const Story = {
  title: 'Components/Punch-Out-Time-Cell',
  component: PunchOutTimeCell
}

const Template = (args) => <PunchOutTimeCell {...args} />
Template.args = {}

export const SmallMobile = Template.bind({})
SmallMobile.args = {
  ...Template.args
}
SmallMobile.parameters = {
  viewport: {
    defaultViewport: 'mobile1'
  }
}

export const Desktop = Template.bind({})
Desktop.args = {
  ...Template.args
}

export default Story;
