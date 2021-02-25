import React from 'react'
import PropTypes from 'prop-types'
import ListItems from './ListItem'
import { mergeStyleSets, Stack } from '@fluentui/react'

const List = ({ items }) => {
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
  if (!Array.isArray(items)) return null
  return (
    <Stack className={styles.wrapper}>
      <ListItems items={items} />
    </Stack>
  )
}

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      isLast: PropTypes.bool,
      mainText: PropTypes.string,
      subText: PropTypes.string,
      onClick: PropTypes.func,
    })
  ).isRequired,
}

export default React.memo(List)
