import React from 'react'
import ListItem from '..'

const Template = (args) => {
  return <ListItem {...args} />
}
Template.args = {
  isLast: true,
  mainText: 'Asia/Kolkata',
  subText: 'IN',
}

export const Example = Template.bind({})
Example.args = { ...Template.args }

const Story = {
  title: 'Components/List Item',
  component: ListItem,
}

export default Story
