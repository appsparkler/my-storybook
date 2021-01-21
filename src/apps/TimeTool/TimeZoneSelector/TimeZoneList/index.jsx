import React from 'react'
import PropTypes from 'prop-types'
import {
  Stack, Text,
  mergeStyleSets
} from '@fluentui/react'
import Marker from './Marker.jsx'

const TimeZoneListItem = ({
  name, countries, isLast,
  onSelectTimezone
}) => {
  const styles = React.useMemo(() => mergeStyleSets({
    wrapper: {
      padding: 2,
      border: 'thin black solid',
      borderBottom: !isLast ? 0: 'thin black solid',
      cursor: 'pointer',
      button: {
        border: 0,
        textAlign: 'left'
      }
    }
  }), [isLast])

  const onClick = React.useCallback(() => {
    onSelectTimezone({name, countries})
  },[name, countries, onSelectTimezone])

  return (
    <Stack
      vertical
      className={styles.wrapper}
    >
      <button onClick={onClick}>
        <Stack vertical>
          <Text variant="large">
            {name}
          </Text>
          <Text variant="small">
            {countries}
          </Text>
        </Stack>
      </button>
    </Stack>
  )
}

const TimeZoneItems = ({
  timezones, onSelectTimezone
}) => timezones.map(({name, ...restArgs}) => (
    <TimeZoneListItem
      key={name}
      name={name}
      onSelectTimezone={onSelectTimezone}
      {...restArgs}
    />
  ))

const TimeZoneList = ({
  timezones, onSelectTimezone,
  searchTerm
}) => {
  const styles = React.useMemo(() => mergeStyleSets({
    wrapper: {
      border: 'thick lightgoldenrodyellow inset',
      maxHeight: 300,
      overflow: 'auto',
      mark: {
        background: 'orange',
        color: 'black'
      }
    }
  }), []);

  const timeZoneItems = {
    timezones, onSelectTimezone
  }

  return (
    <Marker highlightText={searchTerm}>
      <Stack
        className={styles.wrapper}
      >
        <TimeZoneItems {...timeZoneItems}/>
      </Stack>
    </Marker>
  )
}

TimeZoneList.propTypes = {
  timezones: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      onSelectTimezone: PropTypes.func
    })
  ),
  onSelectTimezone: PropTypes.func,
  searchTerm: PropTypes.string,
}

TimeZoneList.defaultProps = {
  timezones: [],
  searchTerm: ''
}

export default React.memo(TimeZoneList)
