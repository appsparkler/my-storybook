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
    selectedRegion: null
  });

  const [calloutState, setCalloutState] = React.useState({
    show: false
  })

  const [timeZoneListState, setTimeZoneListState] = React.useState({
    timezones: []
  })

  const wrapper = {
    vertical: true,
    tokens:{
      childrenGap: 10
    }
  }

  const dropdown = {
    placeholder: 'Select Region',
    options: React.useMemo(() => getRegions(), []),
    onChange: React.useCallback((evt, selectedRegion) => {
      setTimezoneSelectorState(currentState => ({
        ...currentState,
        selectedRegion
      }))
    }, [])
  }

  const textField = {
    disabled: React.useMemo(() => {
      return Boolean(!timezoneSelectorState.selectedRegion)
    }, [timezoneSelectorState.selectedRegion]),
    placeholder: 'Select Timezone',
    id: useId('timezone-selector'),
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
      () => `#${textField.id}`, [textField.id]
    ),
    isBeakVisible: false,
    gapSpace: 0,
    setInitialFocus: false
  }

  const timeZoneList = {
    ...timeZoneListState,
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
      setTimeZoneListState(currentState => ({
        ...currentState,
        timezones: filteredTimezones
      }));
    }
  },[
    timezoneSelectorState.selectedRegion,
    timezones
  ]);

  return (
    <Stack {...wrapper}>
      <Dropdown {...dropdown} />
      <TextField {...textField} />
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
