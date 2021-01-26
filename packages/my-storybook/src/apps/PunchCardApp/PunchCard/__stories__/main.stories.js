import React from 'react'
import PunchCardApp from '../'
import {
  WithItems1 as PunchedSlotsWithItems1Story,
  WithItems2 as PunchedSlotsWithItems2Story,
  WithoutItems as PunchedSlotsWithoutItemsStory,
} from '../PunchedSlots/__stories__/main.stories.js'
import { Template as GoalForTheDayTemplate } from '../GoalForTheDayForm/__stories__/main.stories.js'

import { Template as ScheduledSlotsTemplate } from '../ScheduledSlots/__stories__/main.stories.js'

const Story = {
  title: 'Apps/Punch Card App/Punch Card',
  component: PunchCardApp,
}

export const Template = (args) => <PunchCardApp {...args} />
Template.args = {
  title: 'My Punch Card',
  goalForTheDay: { ...GoalForTheDayTemplate.args },
  id: '7c046400-6b88-4dad-be87-54a8599c3324',
  punchedSlots: [...PunchedSlotsWithItems1Story.args.items],
  scheduledSlots: [...ScheduledSlotsTemplate.args.items],
}
Template.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  },
}

export const SmallMobile = Template.bind({})
SmallMobile.args = {
  ...Template.args,
}
SmallMobile.parameters = {
  ...Template.parameters,
}

export const LargeMobile = Template.bind({})
LargeMobile.args = {
  ...Template.args,
}
LargeMobile.parameters = {
  ...Template.parameters,
  viewport: {
    defaultViewport: 'mobile2',
  },
}

export const WithoutItems = LargeMobile.bind({})
WithoutItems.parameters = LargeMobile.parameters
WithoutItems.args = {
  ...Template.args,
  punchedSlotItems: [...PunchedSlotsWithoutItemsStory.args.items],
}

export const WithItems1 = Template.bind({})
WithItems1.args = {
  ...Template.args,
  punchedSlots: [...PunchedSlotsWithItems1Story.args.items],
}
WithItems1.parameters = {
  viewport: {
    defaultViewport: 'mobile2',
  },
}

export const WithItems2 = LargeMobile.bind({})
WithItems2.parameters = { ...LargeMobile.parameters }
WithItems2.args = {
  ...Template.args,
  punchedSlots: [...PunchedSlotsWithItems2Story.args.items],
}

export const WithoutID = LargeMobile.bind({})
WithoutID.parameters = { ...LargeMobile.parameters }
WithoutID.args = {
  ...Template.args,
  punchedSlotItems: [...PunchedSlotsWithItems2Story.args.items],
  id: null,
}

export default Story
