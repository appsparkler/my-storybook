import React from 'react'
import NewPunchCardForm from '../'

const Story = {
  title: 'Forms/New Punch Card Form',
  component: NewPunchCardForm
}

const Template = (args) => <NewPunchCardForm {...args} />
Template.args = {}

export const SmallMobile = Template.bind({});
SmallMobile.args = Template.args
SmallMobile.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  }
}

export const LargeMobile = Template.bind({});
LargeMobile.args = Template.args
LargeMobile.parameters = {
  viewport: {
    defaultViewport: 'mobile2'
  }
}

export const Tablet = Template.bind({});
Tablet.args = Template.args
Tablet.parameters = {
  viewport: {
    defaultViewport: 'tablet'
  }
}

export const Desktop = Template.bind({});
Desktop.args = Template.args

export default Story
