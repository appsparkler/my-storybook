import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from '@fluentui/react'
import sortBy from 'lodash/sortBy'
import TimezoneData from 'moment-timezone/data/meta/latest'

const getUnsortedRegions = () =>
  Object.keys(TimezoneData.zones)
    .map((item, idx) => item.split('/')[0])
    .reduce((loop, region) => {
      const regionIsAdded = loop.some(
        (addedRegion) => addedRegion.key === region
      )
      if (!regionIsAdded)
        loop.push({
          key: region,
          text: region,
        })
      return loop
    }, [])

export const getRegions = () =>
  sortBy(getUnsortedRegions(), ['key']).concat([{ key: 'All', text: 'All' }])

const RegionDropdown = ({ onSelectRegion }) => {
  const timezoneDropdown = React.useMemo(
    () => ({
      placeholder: 'Select Region',
      options: getRegions(),
      onChange: (evt, selectedRegion) => {
        onSelectRegion(selectedRegion.text)
      },
    }),
    [onSelectRegion]
  )
  return <Dropdown {...timezoneDropdown} />
}

RegionDropdown.propTypes = {
  onSelectRegion: PropTypes.func,
}

export default RegionDropdown
