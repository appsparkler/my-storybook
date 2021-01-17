import React from 'react'
import PropTypes from 'prop-types'
import {
  Stack, Text, mergeStyleSets
} from '@fluentui/react'

const TimeZoneListItem = ({
  name, countries, isLast
}) => {

  const styles = mergeStyleSets({
    wrapper: {
      border: 'thin black solid',
      borderBottom: !isLast ? 0: 'thin black solid',
      cursor: 'pointer',
      padding: 3
    }
  })

  return (
    <Stack vertical className={styles.wrapper}>
      <Text variant="large">
        {name}
      </Text>
      <Text variant="small">
        {countries}
      </Text>
    </Stack>
  )
}

const TimeZoneList = ({timezones}) => timezones
  .map(({name, ...restArgs}) => (
    <TimeZoneListItem
      key={name}
      name={name}
      {...restArgs}
    />
  ))

TimeZoneList.propTypes = {
  timzones: PropTypes.array
}

TimeZoneList.defaultProps = {
  timezones: []
}

export default React.memo(TimeZoneList)
