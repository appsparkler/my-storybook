import React from 'react'
import PunchCardButtons from '../'

const Story = {
  component: PunchCardButtons,
  title: 'Components/Punch Card Buttons'
}

const Template = (args) => <PunchCardButtons {...args} />
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

export const Desktop = Template.bind({})
Desktop.args = {...Template.args}

export default Story
