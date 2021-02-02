import React from 'react'
import { LikeButton } from './like-buttons'

const Story = {
  title: 'POC/HOC or HOOK',
  component: LikeButton,
}

const Template = ({ children, ...args }) => (
  <LikeButton {...args}>{children}</LikeButton>
)
Template.args = {
  children: 'Converted With Likify',
}

export const HOC = Template.bind({})
HOC.args = Template.args

export default Story
