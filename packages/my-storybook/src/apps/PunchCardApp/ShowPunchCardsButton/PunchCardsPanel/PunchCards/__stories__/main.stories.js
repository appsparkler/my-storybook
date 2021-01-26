import React from 'react'
import { PunchCardListItem } from '../'

const Story = {
  title:
    'Apps/Punch Card App/Show Punch Cards Button/Punch Cards Panel/Punch Card List Item',
  component: PunchCardListItem,
}

export const Template = (args) => <PunchCardListItem {...args} />
Template.args = {
  title: 'My Punch Card...',
}
Template.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  },
}

export default Story
