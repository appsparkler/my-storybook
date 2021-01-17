import React from 'react'
import PropTypes from 'prop-types'
import {
  Stack, Text,
  mergeStyleSets
} from '@fluentui/react'

const TimeZoneListItem = ({
  name, countries, isLast,
  onClick
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

  return (
    <Stack vertical className={styles.wrapper}>
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

const TimeZoneList = ({timezones, onClick}) => timezones
  .map(({name, ...restArgs}) => (
    <TimeZoneListItem
      key={name}
      name={name}
      {...restArgs}
    />
  ))

TimeZoneList.propTypes = {
  timzones: PropTypes.array,
  onClick: PropTypes.func
}

TimeZoneList.defaultProps = {
  timezones: []
}

export default React.memo(TimeZoneList)
