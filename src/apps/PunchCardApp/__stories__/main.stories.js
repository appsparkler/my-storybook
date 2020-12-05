import React from 'react'
import PunchCardApp from '../'
// import {
//   Template as PunchCardStoryTemplate,
//   WithoutItems as PunchCardWithoutItemsStory,
//   WithItems1 as PunchCardWithItems1Story,
//   WithItems2 as PunchCardWithItems2Story,
// } from '../PunchCard/__stories__/main.stories'

import {
  Template as PunchCardsPanelTemlate
}  from '../PunchCardsPanel/__stories__/main.stories'
import {
  Template as PunchCard
}  from '../PunchCard/__stories__/main.stories'

const Story = {
  title: 'Apps/Punch Card App',
  component: PunchCardApp
}

export const Template = (args) => <PunchCardApp {...args} />
Template.args = {
  isPunchCardsPanelOpen:  false,
  punchCards: [],
  selectedPunchCard: null
}
Template.parameters = {
  viewport: {
    defaultViewport: 'mobile1'
  }
}

export const Variant1 = Template.bind({})
Variant1.storyName = "With Punch Cards"
Variant1.args = {
  ...Template.args,
  isPunchCardsPanelOpen: true,
  punchCards: PunchCardsPanelTemlate.args.items
}
Variant1.parameters = {
  ...Template.parameters
}

export const Variant2 = Template.bind({})
Variant2.storyName = "With Selected Punch Card"
Variant2.args = {
  ...Template.args,
  ...Variant1.args,
  isPunchCardsPanelOpen: false,
  selectedPunchCard: {
    ...PunchCard.args,
    punchedSlots: [],
    scheduledSlots: []
  },
}
Variant2.parameters = {
  storyname: 'hello',
  ...Template.parameters,
}

/*
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

export const WithItems1 = Template.bind({})
WithItems1.args = {
  ...Template.args,
  punchCard: {
    ...PunchCardWithItems1Story.args
  }
}
WithItems1.parameters = {
  ...LargeMobile.parameters
}

export const WithItems2 = Template.bind({})
WithItems2.args = {
  ...Template.args,
  punchCard: {
    ...PunchCardWithItems2Story.args
  }
}
WithItems2.parameters = {
  ...LargeMobile.parameters
}
*/
export default Story
