import React from 'react'
import PropTypes from 'prop-types'
import { MessageBar, MessageBarType, mergeStyleSets } from '@fluentui/react'
import { convertMinutesToHours } from '../../shared'

const classNames = mergeStyleSets({
  messageBar: {
    maxWidth: 185,
  },
})

const InfoBarLayout = ({ messageBar, content }) => (
  <MessageBar {...messageBar}>{content}</MessageBar>
)

const InfoBar = ({ minutesLeft }) => {
  const [state, setState] = React.useState({
    hoursLeft: 0,
    messageBar: {
      className: classNames.messageBar,
      messageBarType: MessageBarType.info,
    },
  })
  const infoBar = {
    messageBar: {
      ...state.messageBar,
    },
    content: React.useMemo(() => `${state.hoursLeft} hrs to go...`, [
      state.hoursLeft,
    ]),
  }

  React.useEffect(() => {
    const hoursLeft = convertMinutesToHours(minutesLeft)
    setState((currentState) => ({
      ...currentState,
      hoursLeft,
    }))
  }, [minutesLeft])

  return <InfoBarLayout {...infoBar} />
}

InfoBar.propTypes = {
  minutesLeft: PropTypes.number,
}

export default React.memo(InfoBar)
