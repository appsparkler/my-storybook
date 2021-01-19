import React from 'react';
import TimeZoneSelector from '../index.jsx';
import TimezoneData from 'moment-timezone/data/meta/latest';

const zones = Object
    .entries(TimezoneData.zones)
    .map(([key, value]) => value)

const timezones = zones
  .map(({
    name, countries = []
  }, idx) => ({
    name,
    countries: countries.join(', '),
    isLast: TimezoneData.countries.length === (idx + 1),
  }));

const Story = {
  title: 'Apps/Time Tool',
  component: TimeZoneSelector
}

export const Example = (args) => <TimeZoneSelector {...args} />
Example.storyName = "Time Zone Selector"
Example.args = {
  timezones
}

export default Story;
