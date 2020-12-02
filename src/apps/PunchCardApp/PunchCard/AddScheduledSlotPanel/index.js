import React from 'react'
import PropTypes from 'prop-types'
import {Panel} from '@fluentui/react'

const AddScheduledSlotPanel = ({
  isOpen
}) => {
  const [state, setState] = React.useState({
    isOpen: false
  });

  const panel = {
    isLightDismiss: true,
    isOpen: state.isOpen,
    onDismiss: React.useCallback(() => {
      setState(currentState => ({
        ...currentState,
        isOpen: false
      }))
    },[])
  }

  React.useEffect(() => {
    setState(currentState => ({
      ...currentState,
      isOpen
    }))
  }, [isOpen])

  return <Panel {...panel} />
}

AddScheduledSlotPanel.propTypes = {
  isOpen: PropTypes.bool
}

export default React.memo(AddScheduledSlotPanel);
