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

export default React.memo(ListItem)
