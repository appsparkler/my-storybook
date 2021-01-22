import React from 'react'
import TimeToolV2 from '../TimeToolV2'

const Story = {
  title: 'Apps/Time Tool',
  component: TimeToolV2
}

const Template = (args) => <TimeToolV2 {...args} />
Template.args = {}

export const AppV2 = Template.bind({})
AppV2.args = {...Template.args}

export default Story;
