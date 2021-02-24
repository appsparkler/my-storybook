import React from 'react'
import PropTypes from 'prop-types'
import { mergeStyleSets, Stack, Text } from '@fluentui/react'

const ListItem = ({ isLast, mainText, subText, onClick }) => {
  const styles = React.useMemo(
    () =>
      mergeStyleSets({
        wrapper: {
          padding: 2,
          borderTop: 'thin black solid',
          borderBottom: !isLast ? 0 : 'thin black solid',
          cursor: 'pointer',
          button: {
            border: 0,
            textAlign: 'left',
          },
        },
      }),
    [isLast]
  )

  /*
  const onClick = React.useCallback(() => {
   // onSelectTimezone({ name, countries })
  }, [name, countries, onSelectTimezone])
*/
  return (
    <Stack vertical className={styles.wrapper}>
      <button onClick={onClick}>
        <Stack vertical>
          <Text variant="large">{mainText}</Text>
          <Text variant="small">{subText}</Text>
        </Stack>
      </button>
    </Stack>
  )
}

ListItem.propTypes = {
  mainText: PropTypes.string,
  subText: PropTypes.string,
  onClick: PropTypes.func,
  isLast: PropTypes.bool,
}

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
