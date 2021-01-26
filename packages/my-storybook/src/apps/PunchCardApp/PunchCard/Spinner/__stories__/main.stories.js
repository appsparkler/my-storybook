import React from 'react'
import Spinner from '../'

const Story = {
  title: 'Apps/Punch Card App/Punch Card/Spinner',
  component: Spinner,
}

export const Template = (args) => <Spinner {...args} />
Template.args = {
  show: true,
}
Template.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  },
}

export default Story
