import React from 'react'
import PropTypes from 'prop-types'
import {Panel} from '@fluentui/react'
import ScheduledSlotForm from '../ScheduledSlotForm'

const AddScheduledSlotPanelLayout = ({
  show, panel, scheduledSlotForm
}) => show && (
  <Panel {...panel}>
    <ScheduledSlotForm {...scheduledSlotForm} />
  </Panel>
)

const AddScheduledSlotPanel = ({
  isOpen, onAddScheduledSlot,
  onDismiss
}) => {

  const [state, setState] = React.useState({
    panel: {
      isOpen: false
    }
  })

  const updatePanel = React.useCallback((update) => {
    setState(currentState => ({
      ...currentState,
      panel: {
        ...currentState.panel,
        ...update
      }
    }))
  }, [])

  const addScheduledSlotPanel = {
    show: state.panel.isOpen,
    scheduledSlotForm: {
      onSubmit: onAddScheduledSlot
    },
    panel: {
      ...state.panel,
      isLightDismiss: true,
      headerText: 'Add Scheduled Slot',
      onDismiss: React.useCallback(() => {
        updatePanel({isOpen: false})
        onDismiss()
      }, [updatePanel, onDismiss])
    }
  }

  React.useEffect(() => {
    updatePanel({
      isOpen
    })
  }, [isOpen, updatePanel])

  return <AddScheduledSlotPanelLayout {...addScheduledSlotPanel} />
}

AddScheduledSlotPanel.propTypes = {
  isOpen: PropTypes.bool,
  onAddScheduledSlot: PropTypes.func,
  onDismiss: PropTypes.func,
}

export default React.memo(AddScheduledSlotPanel);
