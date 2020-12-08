import  React from 'react'
import InfoBar from '../'

const Story = {
  title: 'Apps/Punch Card App/Punch Card/Info Bar',
  component: InfoBar
}

export const Template = (args) => <InfoBar {...args} />
Template.args = {
  minutesLeft: 80
}
Template.parameters = {
  viewport: {
    defaultViewport: 'mobile1'
  }
}

export const WithFalsy = Template.bind({})
WithFalsy.args = {
  minutesLeft: null
}
WithFalsy.parameters = {
  viewport: {
    defaultViewport: 'mobile1'
  }
}

export const With0 = Template.bind({})
WithFalsy.args = {
  minutesLeft: 0
}


export default Story
