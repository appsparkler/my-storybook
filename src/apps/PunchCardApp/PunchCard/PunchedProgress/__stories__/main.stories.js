import React from 'react'
import PunchedProgress from '../'

const Story = {
  title: 'Apps/Punch Card App/Punch Card/Punched Progress',
  component: PunchedProgress
}

const Template = (args) => <PunchedProgress {...args}/>
Template.args = {}

export const SmallMobile = Template.bind({});
SmallMobile.args = {
  progress: .10,
  show: true
}
SmallMobile.parameters = {
  viewport: {
    defaultViewport: 'mobile1'
  }
}

export default Story
