import React from 'react'
import TimeZoneList from '../TimeZoneList/index.jsx'
import {
  mergeStyleSets, TextField,
  Callout as FabricUICallout, Stack
} from '@fluentui/react'
import { useId } from '@fluentui/react-hooks'
import TimezoneData from 'moment-timezone/data/meta/latest'

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

const Callout = ({show, children, ...restProps}) => show ? (
  <FabricUICallout {...restProps}>
    {children}
  </FabricUICallout>
) : null;

const TimeZoneSelector = () => {

  const styles = React.useMemo(() => mergeStyleSets({
    callout: {
      maxWidth: 300,
      minWidth: 300
    }
  }), [])

  const [state, setState] = React.useState({
    showCallout: false
  })

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
      setState(currentState => ({
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

  return (
    <Stack vertical>
      <TextField {...textField} />
      <Callout {...callout}>
        <TimeZoneList
          timezones={timezones}
          onSelectTimezone={() => alert('hello world')}
        />
      </Callout>
      <pre>{JSON.stringify({state}, null, 2)}</pre>
    </Stack>
  )
}

TimeZoneSelector.propTypes = {

}

const Story = {
  title: 'Apps/Time Tool',
  component: TimeZoneSelector
}

export const Example = (args) => <TimeZoneSelector {...args} />
Example.storyName = "Time Zone Selector"
Example.args = {

}

export default Story;
