import React from 'react'
import Progress from '../'

const Story = {
  title: 'Apps/Punch Card App/Punch Card/Progress',
  component: Progress
}

export const Template = (args) => <Progress {...args}/>
Template.args = {
  punchedPercent: 20,
  scheduledPercent: 40,
  show: true,
  statusEmoji: {
    showFinishFlag: true,
    showScheduledFinishDot: true,
    grossHoursLeft: '02:00'
  }
}

export default Story
