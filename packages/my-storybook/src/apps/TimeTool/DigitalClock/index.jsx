import React from 'react'
import PropTypes from 'prop-types'
import { mergeStyleSets } from '@appsparkler/fluentui-react'
import moment from 'moment'

const DigitalClock = ({
  timestamp,
  showSeconds,
  showSecondsAndMilliSeconds,
}) => {
  const memo = React.useMemo(() => {
    const format = (() => {
      const baseFormat = 'HH : mm'
      if (showSecondsAndMilliSeconds) return `${baseFormat} : ss : SSS`
      if (showSeconds) return `${baseFormat} : ss`
      return baseFormat
    })()
    return {
      displayedTime: moment(timestamp).format(format),
      styles: mergeStyleSets({
        orbitron: {
          fontFamily: 'Orbitron !important',
        },
      }),
    }
  }, [timestamp, showSeconds, showSecondsAndMilliSeconds])

  return <h1 className={memo.styles.orbitron}>{memo.displayedTime}</h1>
}

DigitalClock.propTypes = {
  timestamp: PropTypes.number,
  showSecondsAndMilliSeconds: PropTypes.bool,
  showSeconds: PropTypes.bool,
}

DigitalClock.defaultProps = {
  timestamp: 1611289986979,
  showSecondsAndMilliSeconds: false,
  showSeconds: true,
}

export default React.memo(DigitalClock)
