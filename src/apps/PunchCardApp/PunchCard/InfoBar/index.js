import React from 'react'
import { MessageBar, MessageBarType, mergeStyleSets } from '@fluentui/react'

const classNames = mergeStyleSets({
  messageBar: {
    maxWidth: 185
  }
})

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
    // show: React.useMemo(() => minutesLeft, [minutesLeft])
  }

  React.useEffect(() =>  {
    // https://stackoverflow.com/a/38242552/4742733
    const convertMinutesToHours = (mins) => {
      if(!mins) return '00:00'
      let h = Math.floor(mins / 60);
      let m = mins % 60;
      h = h < 10 ? '0' + h : h;
      m = m < 10 ? '0' + m : m;
      return `${h}:${m}`;
    }
    const hoursLeft = convertMinutesToHours(minutesLeft)
    setState(currentState => ({
      ...currentState,
      hoursLeft
    }))
  },[minutesLeft])

  return <InfoBarLayout {...infoBar}/>
}

export default React.memo(InfoBar)
