import React from 'react'
import PropTypes from 'prop-types'
import TimeZoneList from './TimeZoneList/index.jsx'
import {
  mergeStyleSets,
  TextField,
  Callout as FabricUICallout,
  Stack,
  Dropdown,
} from '@fluentui/react'
import { useId } from '@fluentui/react-hooks'
import TimezoneData from 'moment-timezone/data/meta/latest'
import sortBy from 'lodash/sortBy'

const zones = Object.entries(TimezoneData.zones)
  .map(([key, value]) => value)

const timezones = zones.map(({ name, countries = [] }, idx) => ({
  name,
  countries: countries.join(', '),
  isLast: TimezoneData.countries.length === idx + 1,
  id: name,
  mainText: name,
  subText: countries.join(', ')
}))

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

const Callout = ({ show, children, ...restProps }) =>
  show ? <FabricUICallout {...restProps}>{children}</FabricUICallout> : null

const TimeZoneSelector = ({ onSelectTimezone }) => {
  const styles = React.useMemo(
    () =>
      mergeStyleSets({
        callout: {
          maxWidth: 300,
          minWidth: 300,
        },
        orbitron: {
          fontFamily: 'Orbitron',
        },
      }),
    []
  )

  const [timezoneSelectorState, setTimezoneSelectorState] = React.useState({
    selectedRegion: null,
    selectedRegionTimezones: [],
    filteredTimezones: [],
  })

  const [
    timezoneSearchFieldState,
    setTimezoneSearchFieldState,
  ] = React.useState({
    value: '',
    autoComplete: 'off',

    placeholder: 'Search Timezone...',
  })

  const [calloutState, setCalloutState] = React.useState({
    show: false,
    className: styles.callout,
    coverTarget: false,
    isBeakVisible: false,
    gapSpace: 2,
  })

  const wrapper = React.useMemo(
    () => ({
      vertical: true,
      tokens: {
        childrenGap: 10,
      },
    }),
    []
  )

  const regionDropdown = React.useMemo(
    () => ({
      placeholder: 'Select Region',
      options: getRegions(),
      onChange: (evt, selectedRegion) => {
        setTimezoneSelectorState((currentState) => ({
          ...currentState,
          selectedRegion,
        }))
        setTimezoneSearchFieldState((currentState) => ({
          ...currentState,
          value: '', // reset search-field when region changes.
        }))
      },
    }),
    []
  )

  const timezoneSearchField = {
    ...timezoneSearchFieldState,
    disabled: React.useMemo(() => {
      return Boolean(!timezoneSelectorState.selectedRegion)
    }, [timezoneSelectorState.selectedRegion]),
    id: useId('timezone-selector'),
    onChange: React.useCallback((evt, value) => {
      setCalloutState((currentState) => ({
        ...currentState,
        show: true,
      }))
      setTimezoneSearchFieldState((currentState) => ({
        ...currentState,
        value,
      }))
    }, []),
    onClick: React.useCallback((evt) => {
      evt.target.select(0, 9999)
      setCalloutState((currentState) => ({
        ...currentState,
        show: true,
      }))
    }, []),
  }

  const callout = {
    ...calloutState,
    onDismiss: React.useCallback(() => {
      setCalloutState((currentState) => ({
        ...currentState,
        show: false,
      }))
    }, []),
    target: React.useMemo(() => `#${timezoneSearchField.id}`, [
      timezoneSearchField.id,
    ]),
  }

  const timeZoneList = {
    timezones: timezoneSelectorState.filteredTimezones,
    onSelectTimezone: React.useCallback(
      (tz) => {
        setTimezoneSearchFieldState((currentState) => ({
          value: tz.name,
        }))
        setCalloutState((currentState) => ({
          ...currentState,
          show: false,
        }))
        onSelectTimezone(tz)
      },
      [onSelectTimezone]
    ),
    searchTerm: timezoneSearchFieldState.value,
  }

  React.useEffect(() => {
    if (timezoneSelectorState.selectedRegion) {
      const selectedRegion = timezoneSelectorState.selectedRegion
      const filteredTimezones = (() => {
        const selectedRegionFilter = ({ name }) =>
          name.search(selectedRegion.key) > -1
        if (selectedRegion.key === 'All') return timezones
        return timezones.filter(selectedRegionFilter)
      })()
      setTimezoneSelectorState((currentState) => ({
        ...currentState,
        selectedRegionTimezones: filteredTimezones,
      }))
    }
  }, [timezoneSelectorState.selectedRegion])

  React.useEffect(() => {
    const searchTerm = timezoneSearchField.value
    const filteredTimezones = timezoneSelectorState.selectedRegionTimezones.filter(
      ({ name, countries }) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase()
        const nameHasSearchTerm =
          name.toLowerCase().search(lowerCaseSearchTerm) > -1
        const countriesHasSearchTerm =
          countries.toLowerCase().search(lowerCaseSearchTerm) > -1
        return nameHasSearchTerm || countriesHasSearchTerm
      }
    )
    setTimezoneSelectorState((currentState) => ({
      ...currentState,
      filteredTimezones,
    }))
  }, [timezoneSearchField.value, timezoneSelectorState.selectedRegionTimezones])

  return (
    <Stack {...wrapper}>
      <Dropdown {...regionDropdown} />
      <TextField {...timezoneSearchField} />
      <Callout {...callout}>
        <TimeZoneList {...timeZoneList} />
      </Callout>
    </Stack>
  )
}

TimeZoneSelector.propTypes = {
  onSelectTimezone: PropTypes.func,
}

export default React.memo(TimeZoneSelector)
