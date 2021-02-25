import React from 'react'
import List from '..'

const Template = (args) => <List {...args} />
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

export const example = Template.bind({})
example.args = Template.args

const Story = {
  title: 'Components/List',
  component: List,
}

export default Story
