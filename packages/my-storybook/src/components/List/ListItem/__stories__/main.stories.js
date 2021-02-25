import React from 'react'
import ListItems from '..'

const Template = (args) => <ListItems {...args} />
Template.args = {
  items: [
    {
      id: '1',
      isLast: false,
      mainText: 'Asia/Kolkata',
      subText: 'IN',
    },
    {
      id: '2',
      isLast: true,
      mainText: 'Asia/Hong Kong',
      subText: 'HK',
    },
  ],
}

export const Example = Template.bind({})
Example.args = { ...Template.args }

const Story = {
  title: 'Components/List/List Items',
  component: ListItems,
}

export default Story
