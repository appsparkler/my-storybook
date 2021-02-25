import React from 'react'
import { Dropdown } from '@fluentui/react'

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

const Template = (args) => <RegionDropdown {...args} />
Template.args = {
  onSelectTimezone: alert.bind(null, 'yey!'),
}

const Story = {
  title: 'Apps/Time Tool/Timezone Selector/Region Dropdown',
}

export default Story
