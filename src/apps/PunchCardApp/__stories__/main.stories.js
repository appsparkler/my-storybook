import React from 'react'
import PunchCardApp from '../'
import {WithItems1 as PunchedSlotsWithItems1Story} from '../PunchCard/PunchedSlots/__stories__/main.stories'

const Story = {
  title: 'Apps/Punch Card App',
  component: PunchCardApp
}

export const Template = (args) => <PunchCardApp {...args} />
Template.args = {
  punchCard: {
    id: '7c046400-6b88-4dad-be87-54a8599c332',
    punchedSlotItems: [...PunchedSlotsWithItems1Story.args.items],
    goalHours:'09',
    goalMinutes: '00'
  }
}
Template.parameters = {
  viewport: {
    defaultViewport: 'mobile1'
  }
}

// export const

export default Story
