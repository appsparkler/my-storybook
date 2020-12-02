import React from 'react'
import PropTypes from 'prop-types'
import {Panel} from '@fluentui/react'

const AddScheduledSlotPanel = ({
  isOpen, onDismiss
}) => {
  const [state, setState] = React.useState({
    isOpen: false
  });

  const panel = {
    isLightDismiss: true,
    isOpen: state.isOpen,
    children: 'hello',
    headerText: 'Add Scheduled Slot',
    onDismiss: React.useCallback(() => {
      setState(currentState => ({
        ...currentState,
        isOpen: false
      }))
      onDismiss()
    },[onDismiss])
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
  isOpen: PropTypes.bool,
  onDismiss: PropTypes.func
}

export default React.memo(AddScheduledSlotPanel);
