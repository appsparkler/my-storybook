import React from 'react'
import TimeZoneList, { ListItem } from '../index.jsx'
import TimezoneData from 'moment-timezone/data/meta/latest'

const Story = {
  title: 'Apps/Time Tool/Time Zone Selector/Time Zone List',
  component: TimeZoneList,
  subcomponents: { ListItem },
}

const zones = Object.entries(TimezoneData.zones).map(([key, value]) => value)

const timezones = zones.map(({ name, countries = [] }, idx) => ({
  name,
  countries: countries.join(', '),
  isLast: TimezoneData.countries.length === idx + 1,
}))

export const Example = (args) => <TimeZoneList {...args} />
Example.args = {
  timezones,
}

export const listItemExample = (args) => (
  <ListItem
    isLast={false}
    mainText="Asia/Nicosia"
    subText="CY"
    onClick={() => alert('clicked')}
  />
)

export default Story
