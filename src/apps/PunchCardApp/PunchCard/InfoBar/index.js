import React from 'react'
import { MessageBar, MessageBarType, mergeStyleSets } from '@fluentui/react'

const classNames = mergeStyleSets({
  messageBar: {
    maxWidth: 185
  }
})

const InfoBarLayout = ({
  messageBar, content, show
}) => show && (
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
    show: React.useMemo(() => minutesLeft, [minutesLeft])
  }

  React.useEffect(() =>  {
    setState(currentState => ({
      ...currentState,
      hoursLeft: minutesLeft ? (minutesLeft/60).toFixed(2) : 0
    }))
  },[minutesLeft])

  return <InfoBarLayout {...infoBar}/>
}

export default React.memo(InfoBar)
