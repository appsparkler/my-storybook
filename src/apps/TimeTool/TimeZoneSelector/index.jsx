import React from 'react';
import PropTypes from 'prop-types';
import TimeZoneList from './TimeZoneList/index.jsx'
import {
  mergeStyleSets, TextField,
  Callout as FabricUICallout, Stack,
  Dropdown
} from '@fluentui/react'
import { useId } from '@fluentui/react-hooks'

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

  const [calloutState, setCalloutState] = React.useState({
    show: false
  })

  const textField = {
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
    },[])
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

  const dropdown = {

  }

  return (
    <Stack vertical>
      {false && <Dropdown {...dropdown} />}
      <TextField {...textField} />
      <Callout {...callout}>
        <TimeZoneList
          timezones={timezones}
          onSelectTimezone={() => alert('hello world')}
        />
      </Callout>
    </Stack>
  )
}

TimeZoneSelector.propTypes = {
  timezones: PropTypes.array
}

export default React.memo(TimeZoneSelector);
