import React from 'react';
import PropTypes from 'prop-types';
import TimeZoneList from './TimeZoneList/index.jsx'
import {
  mergeStyleSets, TextField,
  Callout as FabricUICallout, Stack,
  Dropdown
} from '@fluentui/react'
import { useId } from '@fluentui/react-hooks'
import TimezoneData from 'moment-timezone/data/meta/latest';
import sortBy from 'lodash/sortBy'

const getUnsortedRegions = () => Object
  .keys(TimezoneData.zones)
  .map((item, idx) => item.split('/')[0])
  .reduce((loop, region) => {
    const regionIsAdded = loop
      .some(addedRegion => addedRegion.key === region);
    if(!regionIsAdded) loop.push({
      key: region,
      text: region
    })
    return loop
  },[])

export const getRegions = () => sortBy(getUnsortedRegions(), ["key"])
  .concat([{key: "All", text: "All"}]);

const Callout = ({show, children, ...restProps}) => show ? (
  <FabricUICallout {...restProps}>
    {children}
  </FabricUICallout>
) : null;

const TimeZoneSelector = ({timezones}) => {

  const styles = React.useMemo(() => mergeStyleSets({
    callout: {
      maxWidth: 300,
      minWidth: 300
    }
  }), [])

  const [timezoneSelectorState, setTimezoneSelectorState] = React.useState({
    selectedRegion: null,
    selectedRegionTimezones: [],
    filteredTimezones: []
  });

  const [timezoneSearchFieldState, setTimezoneSearchFieldState] = React.useState({
    value: ''
  })

  const [calloutState, setCalloutState] = React.useState({
    show: false
  })

  const wrapper = {
    vertical: true,
    tokens:{
      childrenGap: 10
    }
  }

  const regionDropdown = {
    placeholder: 'Select Region',
    options: React.useMemo(() => getRegions(), []),
    onChange: React.useCallback((evt, selectedRegion) => {
      setTimezoneSelectorState(currentState => ({
        ...currentState,
        selectedRegion
      }))
      setTimezoneSearchFieldState(currentState => ({
        ...currentState,
        value: '' // reset search-field when region changes.
      }))
    }, [])
  }

  const timezoneSearchField = {
    ...timezoneSearchFieldState,
    disabled: React.useMemo(() => {
      return Boolean(!timezoneSelectorState.selectedRegion)
    }, [timezoneSelectorState.selectedRegion]),
    placeholder: 'Select Timezone',
    id: useId('timezone-selector'),
    onChange: React.useCallback((evt, value) => {
      setTimezoneSearchFieldState(currentState => ({
        ...currentState,
        value
      }))
    },[]),
    onFocus: React.useCallback(() => {
      setCalloutState(currentState => ({
        ...currentState,
        show: true
      }))
    },[]),
    onBlur: React.useCallback(() => {
      setCalloutState(currentState => ({
        ...currentState,
        show: false
      }))
    },[]),
  }

  const callout = {
    ...calloutState,
    className:styles.callout,
    onDismiss:React.useCallback(() => {
      setCalloutState(currentState => ({
        ...currentState,
        showCallout: false
      }))
    }, []),
    target: React.useMemo(
      () => `#${timezoneSearchField.id}`, [timezoneSearchField.id]
    ),
    isBeakVisible: false,
    gapSpace: 0,
    setInitialFocus: false
  }

  const timeZoneList = {
    timezones: timezoneSelectorState.filteredTimezones,
    onSelectTimezone: React.useCallback(() => {

    }, []),
  }

  React.useEffect(() => {
    if(timezoneSelectorState.selectedRegion) {
      const selectedRegion = timezoneSelectorState.selectedRegion;
      const filteredTimezones = (() => {
        const selectedRegionFilter = ({name}) => name
          .search(selectedRegion.key) > -1
        if(selectedRegion.key === "All") return timezones;
        return timezones.filter(selectedRegionFilter)
      })();
      setTimezoneSelectorState(currentState => ({
        ...currentState,
        selectedRegionTimezones: filteredTimezones
      }))
    }
  },[
    timezoneSelectorState.selectedRegion,
    timezones
  ]);

  React.useEffect(() => {
    const searchTerm = timezoneSearchField.value;
    const filteredTimezones = timezoneSelectorState
      .selectedRegionTimezones
      .filter(({name, countries}) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const nameHasSearchTerm = name
          .toLowerCase()
          .search(lowerCaseSearchTerm) > -1;
        const countriesHasSearchTerm = countries
          .toLowerCase()
          .search(searchTerm) > -1;
        return nameHasSearchTerm || countriesHasSearchTerm;
      })
      setTimezoneSelectorState(currentState => ({
        ...currentState,
        filteredTimezones
      }))
  }, [
      timezoneSearchField.value,
      timezoneSelectorState.selectedRegionTimezones
    ])

  return (
    <Stack {...wrapper}>
      <Dropdown {...regionDropdown} />
      <TextField {...timezoneSearchField} />
      <Callout {...callout}>
        <TimeZoneList  {...timeZoneList} />
      </Callout>
    </Stack>
  )
}

TimeZoneSelector.propTypes = {
  timezones: PropTypes.array
}

export default React.memo(TimeZoneSelector);
