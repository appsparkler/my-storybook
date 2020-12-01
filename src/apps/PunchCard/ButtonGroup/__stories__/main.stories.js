import React from 'react'
import ButtonGroup from '../'

const Story = {
  component: ButtonGroup,
  title: 'Components/Punch Card Buttons'
}

const Template = (args) => <ButtonGroup {...args} />
Template.args = {
  punchInText: "😇Start Your Day",
  showIcon: false,
  punchInDisabled: false
}

export const SmallMobile = Template.bind({})
SmallMobile.args = {...Template.args}
SmallMobile.parameters = {
  viewport: {
    defaultViewport: 'mobile1'
  }
}

export const LargeMobile = Template.bind({})
LargeMobile.args = {...Template.args}
LargeMobile.parameters = {
  viewport: {
    defaultViewport: 'mobile2'
  }
}

export default Story
