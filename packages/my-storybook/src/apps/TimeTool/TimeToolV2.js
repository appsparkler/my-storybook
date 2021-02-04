import React from 'react'
import PropTypes from 'prop-types'
import { Stack } from '@fluentui/react'
import moment from 'moment'
import DigitalClock from './DigitalClock/index.jsx'
import TimeZoneSelector from './TimeZoneSelector/index.jsx'

const TimeTool = ({ play }) => {
  const [{ selectedTimezone, now, ...state }, setState] = React.useState({
    selectedTimezone: moment.tz.guess(),
    now: Date.now(),
    intervalID: null,
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

  // React.useEffect(() => {
  //   setInterval(() => {
  //     setState((currentState) => ({
  //       ...currentState,
  //       now: Date.now(),
  //     }))
  //   }, 1000)
  // }, [])

  React.useEffect(() => {
    setState((currentState) => {
      const intervalID = (function () {
        if (play) {
          const intervalID = setInterval(() => {
            setState((currentState) => ({
              ...currentState,
              now: Date.now(),
            }))
          }, 1000)
          return intervalID
        }
        if (!play) {
          clearInterval(currentState.intervalID)
          return null
        }
      })()
      return {
        ...currentState,
        intervalID,
      }
    })
  }, [play])

  return (
    <Stack>
      <DigitalClock {...digitalClock} />
      <TimeZoneSelector {...timezoneSelector} />
    </Stack>
  )
}

TimeTool.propTypes = {
  play: PropTypes.bool,
}

TimeTool.defaultProps = {
  play: true,
}

export default React.memo(TimeTool)
