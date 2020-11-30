import React from 'react'
import PunchedSlots from '../'
import {v4 as uuid} from 'uuid'
import moment from 'moment'

const Story = {
  component: PunchedSlots,
  title: 'Tables/Punched Slots'
}

const Template = (args) => <PunchedSlots {...args} />
Template.args = {
  items: [{
      id: uuid(),
      inTime: moment('15:00', 'HH:mm')
        .subtract(1, 'day')
        .valueOf(),
      outTime: moment('15:30', 'HH:mm')
        .subtract(1, 'day')
        .valueOf()
  },{
    id: uuid(),
    inTime: moment('16:00', 'HH:mm')
      .subtract(1, 'day')
      .valueOf(),
    outTime: null
  }]
}

export const SmallMobile = Template.bind({});
SmallMobile.args = Template.args;
SmallMobile.parameters = {
  viewport: {
    defaultViewport: 'mobile1'
  }
}

export const LargeMobile = Template.bind({});
LargeMobile.args = Template.args;
LargeMobile.parameters = {
  viewport: {
    defaultViewport: 'mobile2'
  }
}

export const Desktop = Template.bind({});
Desktop.args = Template.args;

export default Story
