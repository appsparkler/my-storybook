import React from 'react'
import { Stack, mergeStyleSets } from '@fluentui/react'
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

const ListItems = ({ items }) =>
  items.map((item) => <ListItem key={item.id} {...item} />)

const MultipleItems = ({ items }) => {
  const styles = React.useMemo(
    () =>
      mergeStyleSets({
        wrapper: {
          border: 'thick lightgreen ridge',
          maxHeight: 300,
          overflow: 'auto',
          mark: {
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 3,
            borderTopRightRadius: 8,
            borderTopLeftRadius: 3,
            padding: 1,
            background: 'lightgreen',
            opacity: 0.87,
            textShadow: '0px 0px 2px rgba(0,0,0,.6)',
            color: 'black',
          },
        },
      }),
    []
  )
  console.log(Array.isArray(items))
  if (!Array.isArray(items)) return null
  return (
    <Stack className={styles.wrapper}>
      <ListItems items={items} />
    </Stack>
  )
}

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
