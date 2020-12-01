import React from 'react'
import PunchOutTimeCell from '../'
import moment from 'moment'
import { FORMAT } from '../../../shared'

const Story = {
  title: 'Components/Punch-Out-Time-Cell',
  component: PunchOutTimeCell
}

const Template = (args) => <PunchOutTimeCell {...args} />
Template.args = {}

export const SmallMobileWithoutValue = Template.bind({})
SmallMobileWithoutValue.args = {
  ...Template.args
}
SmallMobileWithoutValue.parameters = {
  viewport: {
    defaultViewport: 'mobile1'
  }
}

export const SmallMobileWithValue = Template.bind({})
SmallMobileWithValue.args = {
  ...Template.args,
  value: moment().format(FORMAT)
}
SmallMobileWithValue.parameters = {
  viewport: {
    defaultViewport: 'mobile1'
  }
}

export const Desktop = Template.bind({})
Desktop.args = {
  ...Template.args
}

export default Story;
