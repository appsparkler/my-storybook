import React from 'react'
import PropTypes from 'prop-types'
import { mergeStyleSets, Stack, Text, getTheme } from '@fluentui/react'

const ListItem = ({ isLast, mainText, subText, onClick }) => {
  const theme = getTheme()
  const styles = React.useMemo(
    () =>
      mergeStyleSets({
        wrapper: {
          padding: 2,
          borderTop: 'thin black solid',
          borderBottom: !isLast ? 0 : `thin ${theme.palette.themeDarker} solid`,
          cursor: 'pointer',
          button: {
            border: 0,
            textAlign: 'left',
          },
        },
      }),
    [isLast, theme]
  )
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

const ListItems = ({ items }) =>
  items.map((item) => <ListItem key={item.id} {...item} />)

ListItems.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      isLast: PropTypes.bool,
      mainText: PropTypes.string,
      subText: PropTypes.string,
      onClick: PropTypes.func,
    })
  ),
}

export default React.memo(ListItems)
