import React from 'react'
import { Stack, Dropdown, Callout, TextField } from '@fluentui/react'
import TimeZoneSelector from '../index.jsx'

const Story = {
  title: 'Apps/Time Tool/Time Zone Selector',
  component: TimeZoneSelector,
}

export const Example = (args) => <TimeZoneSelector {...args} />
Example.args = {}

const useTimezoneDropdown = () => {
  return {
    onSelectTimezone: React.useCallback(() => {}, []),
  }
}

const RegionDropdown = ({ onSelectRegion }) => {
  const timezoneDropdown = React.useMemo(() => {
    return {
      placeholder: 'Select Region',
      options: [
        {
          key: 'Americas',
          text: 'Americas',
        },
        {
          key: 'Asia',
          text: 'Asia',
        },
      ],
      onChange: (evt, selectedRegion) => {
        onSelectRegion(selectedRegion)
      },
    }
  }, [onSelectRegion])
  return <Dropdown {...timezoneDropdown} />
}

export const ExampleV2 = () => {
  const onSelectRegion = React.useCallback((tz) => {}, [])
  return (
    <Stack>
      <RegionDropdown onSelectRegion={onSelectRegion} />
      {/*<TextField  />
      <Callout >
        <h1>Hey A Callout!</h1>
      </Callout>*/}
    </Stack>
  )
}

export default Story
