import React from 'react'
import PropTypes from 'prop-types'
import { MessageBar, MessageBarType, mergeStyleSets } from '@fluentui/react'

const classNames = mergeStyleSets({
  messageBar: {
    maxWidth: 185
  }
})

// https://stackoverflow.com/a/38242552/4742733
export const convertMinutesToHours = (mins) => {
  if(!mins || isNaN(Number(mins))) return '00:00'
  const prefix = (() => {
    if(mins < 0) return '- '
    return ''
  })();
  mins = Math.abs(mins)
  let h = Math.floor(mins / 60);
  let m = mins % 60;
  h = h < 10 ? '0' + h : h;
  m = m < 10 ? '0' + m : m;
  return `${prefix}${h}:${m}`;
}

const InfoBarLayout = ({
  messageBar, content,
}) => (
  <MessageBar {...messageBar}>
    {content}
  </MessageBar>
)

const InfoBar = ({
  minutesLeft,
}) => {
  const [state, setState] = React.useState({
    hoursLeft: 0,
    messageBar: {
      className: classNames.messageBar,
      messageBarType : MessageBarType.info
    }
  })
  const infoBar = {
    messageBar: {
      ...state.messageBar
    },
    content: React.useMemo(
      () => `${state.hoursLeft} hrs to go...`,
      [state.hoursLeft]
    ),
  }

  React.useEffect(() =>  {
    const hoursLeft = convertMinutesToHours(minutesLeft)
    setState(currentState => ({
      ...currentState,
      hoursLeft
    }))
  },[minutesLeft])

  return <InfoBarLayout {...infoBar}/>
}

InfoBar.propTypes = {
  minutesLeft: PropTypes.number
}

export default React.memo(InfoBar)
