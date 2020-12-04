import React from 'react'
import PunchCardsPanel from '../'

const Story = {
  title: 'Apps/Punch Card App/Punch Cards Panel',
  component: PunchCardsPanel
}

export const Template = (args) => <PunchCardsPanel {...args} />
Template.args = {
  isOpen: true,
  items: [{
    id: '1233',
    title: 'My Punch Card'
  },{
    id: '1234',
    title: 'Another Punch Card'
  }],
}
Template.parameters = {
  viewport: {
    defaultViewport: 'mobile1'
  }
}

export default Story
