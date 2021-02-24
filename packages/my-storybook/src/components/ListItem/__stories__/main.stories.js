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

const MultipleItems = ({ items }) =>
  Array.isArray(items)
    ? items.map((item) => <ListItem key={item.id} {...item} />)
    : null

export const ListOfItems = () => (
  <MultipleItems
    items={[
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
    ]}
  />
)

const Story = {
  title: 'Components/List Item',
  component: ListItem,
}

export default Story
