import React from 'react';
import {Stack} from '@fluentui/react'
import DigitalClock from './DigitalClock/index.jsx'
import TimeZoneSelector from './TimeZoneSelector/index.jsx'

const TimeTool = () => {
  const digitalClock = {
    timestamp: Date.now(),
  }

  const timezoneSelector = {
    onSelectTimezone: React.useCallback((tz) => {
      
    }, [])
  }
  return (
    <Stack>
      <DigitalClock {...digitalClock} />
      <TimeZoneSelector {...timezoneSelector}/>
    </Stack>
  )
};


export default TimeTool;
