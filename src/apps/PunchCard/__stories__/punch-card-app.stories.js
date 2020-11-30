import React from 'react'
// import PunchCardApp from '../'
const Story = {
  title: 'Apps/Punch Card App'
}

const Template = (args) => <div {...args} />
Template.args = {
  children: 'Hello World'
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
