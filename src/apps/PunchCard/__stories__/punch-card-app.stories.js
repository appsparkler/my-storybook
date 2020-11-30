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
  goalForTheDay: {
    hours: '08',
    minutes: '30'
  },
  punchedSlots: {
    items: []
  }
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

export default Story
