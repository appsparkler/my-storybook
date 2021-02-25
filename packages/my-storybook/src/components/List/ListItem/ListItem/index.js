import React from 'react'
import PropTypes from 'prop-types'
import { mergeStyleSets, Stack, Text, getTheme } from '@fluentui/react'

const ListItem = ({ id, isLast, mainText, subText, onClick }) => {
  const theme = getTheme()

  const styles = React.useMemo(
    () =>
      mergeStyleSets({
        wrapper: {
          padding: 2,
          borderTop: `thin ${theme.palette.themeDarker} solid`,
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

  const handleClick = React.useCallback(
    (...args) => {
      const isOnClickFunction = typeof onClick === 'function'
      if (isOnClickFunction) onClick({ id, isLast, mainText, subText }, ...args)
    },
    [id, isLast, mainText, subText, onClick]
  )

  return (
    <Stack vertical className={styles.wrapper}>
      <button onClick={handleClick}>
        <Stack vertical>
          <Text variant="large">{mainText}</Text>
          <Text variant="small">{subText}</Text>
        </Stack>
      </button>
    </Stack>
  )
}

ListItem.propTypes = {
  id: PropTypes.string,
  mainText: PropTypes.string,
  subText: PropTypes.string,
  onClick: PropTypes.func,
  isLast: PropTypes.bool,
}

export default ListItem
