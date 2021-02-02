import React from 'react'
import { HookedLikeButton } from './like-buttons'

const Story = {
  title: 'POC/HOC or HOOK',
  component: HookedLikeButton,
}

const Template2 = ({ children, ...args }) => (
  <HookedLikeButton {...args}>{children}</HookedLikeButton>
)
Template2.args = {
  children: 'Hooked Like',
}

export const Hook = Template2.bind({})
Hook.args = Template2.args

export default Story
