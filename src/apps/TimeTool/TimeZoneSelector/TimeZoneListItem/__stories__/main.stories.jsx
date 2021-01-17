import React from 'react'
// import PropTypes from 'prop-types'
import {
  Stack, Text, mergeStyleSets
} from '@fluentui/react'

const zones = [
  {
    "name": "Europe/Tirane",
    "lat": 41.3333,
    "long": 19.8333,
    "countries": [
      "AL", "AX"
    ],
    "comments": ""
  },
  {
    "name": "Asia/Yerevan",
    "lat": 40.1833,
    "long": 44.5,
    "countries": [
      "AM"
    ],
    "comments": ""
  },
  {
    "name": "Europe/Andorra",
    "lat": 42.5,
    "long": 1.5167,
    "countries": [
      "AD"
    ],
    "comments": ""
  }
]

const TimeZoneList = ({timezones}) => timezones
  .map(({name, ...restArgs}) => (
    <TimeZoneListItem
      key={name}
      name={name}
      {...restArgs}
    />
  ))

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

TimeZoneListItem.propTypes = {}

const Story = {
  title: 'Apps/Time Tool/Time Zone Selector/Time Zone List Item',
  component: TimeZoneListItem
}

export const Example = (args) => <TimeZoneListItem {...args} />
Example.storyName = "Time Zone List Item"
Example.args = {
  name: 'Europe/Tirane',
  countries: "AL, AX"
}

export const TheList = (args) => <TimeZoneList {...args} />
TheList.args = {
  timezones: zones.map(({name, countries}, idx) => ({
    name,
    countries: countries.join(', '),
    isLast: zones.length === (idx + 1),
  }))
}

export default Story;
