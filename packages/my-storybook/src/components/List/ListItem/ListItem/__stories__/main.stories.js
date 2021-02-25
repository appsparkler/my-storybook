import React from 'react'
import ListItem from '..'

const Template = (args) => <ListItem {...args} />
Template.args = {
  id: '1',
  isLast: false,
  mainText: 'Asia/Kolkata',
  subText: 'IN',
}

export const Example = Template.bind({})
Example.args = { ...Template.args }

const Story = {
  title: 'Components/List/List Items/List Item',
  component: ListItem,
}

export default Story
