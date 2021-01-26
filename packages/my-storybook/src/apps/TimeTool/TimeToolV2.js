import React from 'react'
import { Stack } from '@fluentui/react'
import moment from 'moment'
import DigitalClock from './DigitalClock/index.jsx'
import TimeZoneSelector from './TimeZoneSelector/index.jsx'

const TimeTool = () => {
  const [{ selectedTimezone, now }, setState] = React.useState({
    selectedTimezone: moment.tz.guess(),
    now: Date.now(),
  })

  const digitalClock = React.useMemo(() => {
    return {
      timestamp: moment(moment(now).tz(selectedTimezone).toArray()).valueOf(),
    }
  }, [selectedTimezone, now])

  const timezoneSelector = {
    onSelectTimezone: React.useCallback((tz) => {
      setState((currentState) => ({
        ...currentState,
        selectedTimezone: tz.name,
      }))
    }, []),
  }

  React.useEffect(() => {
    setInterval(() => {
      setState((currentState) => ({
        ...currentState,
        now: Date.now(),
      }))
    }, 1000)
  }, [])

  return (
    <Stack>
      <DigitalClock {...digitalClock} />
      <TimeZoneSelector {...timezoneSelector} />
    </Stack>
  )
}

export default React.memo(TimeTool)
