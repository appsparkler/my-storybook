import React from 'react'
import PunchCardApp from '../'
import {
  Template as PunchCardStoryTemplate,
  WithoutItems as PunchCardWithoutItemsStory
} from '../PunchCard/__stories__/main.stories'

const Story = {
  title: 'Apps/Punch Card App',
  component: PunchCardApp
}

export const Template = (args) => <PunchCardApp {...args} />
Template.args = {
  punchCard: PunchCardStoryTemplate.args
}
Template.parameters = {
  viewport: {
    defaultViewport: 'mobile1'
  }
}

export const SmallMobile = Template.bind({})
SmallMobile.args = {
  ...Template.args
}
SmallMobile.parameters = {
  ...Template.parameters
}

export const LargeMobile = Template.bind({})
LargeMobile.args = {
  ...Template.args
}
LargeMobile.parameters = {
  ...Template.parameters,
  viewport: {
    defaultViewport: 'mobile2'
  }
}

export const WithoutItems = Template.bind({})
WithoutItems.args = {
  ...Template.args,
  punchCard: {
    ...PunchCardWithoutItemsStory.args
  }
}
WithoutItems.parameters = {
  ...LargeMobile.parameters
}

export default Story
