import React from 'react'
import PunchInButton from '../'

const Story = {
  component: PunchInButton,
  title: 'Components/Punch In Button'
}

const Template = (args) => <PunchInButton {...args} />
Template.args = {
  show: true
}

export const SmallMobile = Template.bind({})
SmallMobile.args = {...Template.args}
SmallMobile.parameters = {
  viewport: {
    defaultViewport: 'mobile1'
  }
}

export default Story;
