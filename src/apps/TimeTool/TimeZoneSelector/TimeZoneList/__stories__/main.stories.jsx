import React from 'react'
import {TextField} from '@fluentui/react'
import TimeZoneList from '../index.jsx'
import TimezoneData from 'moment-timezone/data/meta/latest'

const Story = {
  title: 'Apps/Time Tool/Time Zone Selector/Time Zone List',
  component: TimeZoneList
}

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

export const TheList = (args) => <TimeZoneList {...args} />
TheList.args = {
  timezones,
}

export const TimezoneSearch = () => {
  const [textFieldState, setTextFieldState] = React.useState({
    value: ''
  })

  const [timeZoneList, setTimeZoneList] = React.useState({
    timezones
  })

  const textField = {
    ...textFieldState,
    placeholder: 'Search Timezone',
    onChange: React.useCallback((evt, value) => {
      setTextFieldState(currentState=> ({
        ...currentState,
        value
      }))
      setTimeZoneList(currentState => {
        const filteredTimezones = timezones
          .filter(
            timezone => {
              const matchesName = timezone
                .name
                .search(value) > -1
              const matchesCountries = timezone
                .countries
                .search(value) > -1
              return matchesName || matchesCountries
            }
          )
          .map(
            (timezone, idx, arr) => {
              return {
                ...timezone,
                isLast: idx ===  (arr.length - 1)
              }
            }
          )
        return {
          ...currentState,
          timezones: filteredTimezones
        }
      })
    },[])
  }

  return (
    <>
      <pre>{JSON.stringify({textFieldState}, null, 2)}</pre>
      <TextField {...textField} />
      <TimeZoneList {...timeZoneList} />
    </>
  )
}

export default Story;
