import React from 'react'
import PunchCardApp from '../'
import {
  WithItems1 as WithItems1Story,
  WithItems2 as WithItems2Story,
  WithoutItems as WithoutItemsStory,
} from '../PunchedSlots/__stories__/main.stories.js'

const Story = {
  title: 'Apps/Punch Card App/Punch Card',
  component: PunchCardApp
}

export const Template = (args) => <PunchCardApp {...args} />
Template.args = {
  goalHours: '08',
  goalMinutes: '30',
  id: "7c046400-6b88-4dad-be87-54a8599c3324",
  punchedSlotItems: [
    ...WithItems1Story.args.items
  ],
  scheduledSlots: []
}

export const SmallMobile = Template.bind({});
SmallMobile.args = {
  ...Template.args
}
SmallMobile.parameters = {
  viewport: {
    defaultViewport: 'mobile1'
  }
}

export const LargeMobile = Template.bind({});
LargeMobile.args = {
  ...Template.args
}
LargeMobile.parameters = {
  viewport: {
    defaultViewport: 'mobile2'
  }
}

export const WithoutItems = LargeMobile.bind({});
WithoutItems.parameters = LargeMobile.parameters;
WithoutItems.args = {
  ...Template.args,
  punchedSlotItems: [
    ...WithoutItemsStory.args.items
  ]
}

export const WithItems1 = LargeMobile.bind({});
WithItems1.parameters = LargeMobile.parameters;
WithItems1.args = {
  ...Template.args,
  punchedSlotItems: [
    ...WithItems1Story.args.items
  ]
}

export const WithItems2 = LargeMobile.bind({});
WithItems2.parameters = LargeMobile.parameters;
WithItems2.args = {
  ...Template.args,
  punchedSlotItems: [
    ...WithItems2Story.args.items
  ]
}

export const WithoutID = LargeMobile.bind({});
WithoutID.parameters = LargeMobile.parameters;
WithoutID.args = {
  ...Template.args,
  punchedSlotItems: [
    ...WithItems2Story.args.items
  ],
  id: null
}

export default Story
