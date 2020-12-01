import React from 'react'
import moment from 'moment'
import {v4 as uuid} from 'uuid'
import PunchCardApp from '../'

const Story = {
  title: 'Apps/Punch Card App',
  component: PunchCardApp
}

const Template = (args) => <PunchCardApp {...args} />
Template.args = {
  goalHours: '08',
  goalMinutes: '30',
  punchedSlotItems: [{
    id: uuid(),
    inTime: moment('06:00', 'HH:mm')
      .subtract(1, 'day')
      .valueOf(),
    outTime: moment('06:40', 'HH:mm')
      .subtract(1, 'day')
      .valueOf()
  }, {
    id: uuid(),
    inTime: moment('08:00', 'HH:mm')
      .subtract(1, 'day')
      .valueOf(),
    outTime: null
  }]
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
  punchedSlots: []
}

export const WithItems1 = LargeMobile.bind({});
WithItems1.parameters = LargeMobile.parameters;
WithItems1.args = {
  ...Template.args,
  punchedSLotItems: [...Template.args.punchedSlotItems]
}

export const WithItems2 = LargeMobile.bind({});
WithItems2.parameters = LargeMobile.parameters;
WithItems2.args = {
  ...Template.args,
  punchedSlotItems: [
    Template.args.punchedSlotItems[0],
    {
      ...Template.args.punchedSlotItems[1],
      outTime: moment('09:00', 'HH:mm')
        .subtract(1, 'day')
        .valueOf()
    },
  ]
}

export default Story
