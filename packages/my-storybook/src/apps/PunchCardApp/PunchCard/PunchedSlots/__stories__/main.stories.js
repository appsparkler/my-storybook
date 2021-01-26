import React from 'react'
import PunchedSlots from '../'
import { v4 as uuid } from 'uuid'
import moment from 'moment'

const Story = {
  component: PunchedSlots,
  title: 'Apps/Punch Card App/Punch Card/Punched Slots',
}

export const Template = (args) => <PunchedSlots {...args} />
Template.args = {
  items: [
    {
      id: uuid(),
      inTime: moment('2020-11-10 15:00').subtract(1, 'day').valueOf(),
      outTime: moment('2020-11-10 15:30').subtract(1, 'day').valueOf(),
    },
    {
      id: uuid(),
      inTime: moment('2020-11-10 16:00').subtract(1, 'day').valueOf(),
      outTime: null,
    },
  ],
}
Template.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  },
}

export const SmallMobile = Template.bind({})
SmallMobile.args = Template.args
SmallMobile.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  },
}

export const LargeMobile = Template.bind({})
LargeMobile.args = Template.args
LargeMobile.parameters = {
  viewport: {
    defaultViewport: 'mobile2',
  },
}

export const Desktop = Template.bind({})
Desktop.args = Template.args

export const WithoutItems = Template.bind({})
WithoutItems.args = {
  ...Template.args,
  items: [],
}

export const WithItems1 = Template.bind({})
WithItems1.args = {
  ...Template.args,
  items: [...Template.args.items],
}
WithItems1.parameters = Template.parameters

export const WithItems2 = Template.bind({})
WithItems2.args = {
  ...Template.args,
  items: [
    Template.args.items[0],
    {
      ...Template.args.items[1],
      outTime: moment('2020-11-10 17:00').subtract(1, 'day').valueOf(),
    },
  ],
}
WithItems2.parameters = Template.parameters

export default Story
