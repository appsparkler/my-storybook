import React from 'react'
import ShowPunchCardsButton from '../'

const Story = {
  component: ShowPunchCardsButton,
  title: 'Apps/Punch Card App/Show Punch Cards Button'
}

export const Template = (args) => <ShowPunchCardsButton {...args} />
Template.args = {}
Template.parameters = {
  viewport: {
    defaultViewport: 'mobile1'
  }
}

export default Story
