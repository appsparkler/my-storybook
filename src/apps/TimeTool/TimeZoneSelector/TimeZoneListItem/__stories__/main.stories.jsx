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
  }
]

const TimeZoneListItem = () => {
  const zone0 = zones[1]

  const styles = mergeStyleSets({
    wrapper: {
      border: '1px black solid',
      cursor: 'pointer',
      padding: 3
    }
  })

  return (
    <Stack vertical className={styles.wrapper}>
      <Text variant="large">{zone0.name}</Text>
      <Text variant="small">{zone0.countries.join(',')}</Text>
    </Stack>
  )
}

TimeZoneListItem.propTypes = {

}

const Story = {
  title: 'Apps/Time Tool/Time Zone Selector/Time Zone List Item',
  component: TimeZoneListItem
}

export const Example = (args) => <TimeZoneListItem {...args} />
Example.storyName = "Time Zone List Item"
Example.args = {}

export default Story;
