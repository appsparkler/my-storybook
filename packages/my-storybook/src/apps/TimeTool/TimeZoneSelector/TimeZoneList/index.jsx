import React from 'react'
import PropTypes from 'prop-types'
import { Stack, Text, mergeStyleSets } from '@fluentui/react'
import { Mark } from 'react-mark.js'

console.log({ Mark })
const TimeZoneListItem = ({ name, countries, isLast, onSelectTimezone }) => {
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

  const onClick = React.useCallback(() => {
    onSelectTimezone({ name, countries })
  }, [name, countries, onSelectTimezone])

  return (
    <Stack vertical className={styles.wrapper}>
      <button onClick={onClick}>
        <Stack vertical>
          <Text variant="large">{name}</Text>
          <Text variant="small">{countries}</Text>
        </Stack>
      </button>
    </Stack>
  )
}

const TimeZoneItems = ({ timezones, onSelectTimezone }) =>
  timezones.map(({ name, ...restArgs }) => (
    <TimeZoneListItem
      key={name}
      name={name}
      onSelectTimezone={onSelectTimezone}
      {...restArgs}
    />
  ))

const TimeZoneList = ({ timezones, onSelectTimezone, searchTerm }) => {
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

  const timeZoneItems = {
    timezones,
    onSelectTimezone,
  }

  return (
    <Mark mark={searchTerm}>
      <Stack className={styles.wrapper}>
        <TimeZoneItems {...timeZoneItems} />
      </Stack>
    </Mark>
  )
}

TimeZoneList.propTypes = {
  timezones: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      onSelectTimezone: PropTypes.func,
    })
  ),
  onSelectTimezone: PropTypes.func,
  searchTerm: PropTypes.string,
}

TimeZoneList.defaultProps = {
  timezones: [],
  searchTerm: '',
}

export default React.memo(TimeZoneList)
