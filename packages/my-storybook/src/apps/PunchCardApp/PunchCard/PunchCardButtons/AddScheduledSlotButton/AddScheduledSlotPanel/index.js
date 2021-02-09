import React from 'react'
import PropTypes from 'prop-types'
import { Panel } from '@fluentui/react'
import ScheduledSlotForm from './ScheduledSlotForm'

const AddScheduledSlotPanelLayout = ({ show, panel, scheduledSlotForm }) => (
  <Panel {...panel}>
    <ScheduledSlotForm {...scheduledSlotForm} />
  </Panel>
)

const AddScheduledSlotPanel = ({ isOpen, onAddScheduledSlot, onDismiss }) => {
  const addScheduledSlotPanel = {
    scheduledSlotForm: {
      onSubmit: onAddScheduledSlot,
    },
    panel: {
      isOpen,
      isLightDismiss: true,
      headerText: 'Add Scheduled Slot',
      onDismiss,
    },
  }

  return <AddScheduledSlotPanelLayout {...addScheduledSlotPanel} />
}

AddScheduledSlotPanel.propTypes = {
  isOpen: PropTypes.bool,
  onAddScheduledSlot: PropTypes.func,
  onDismiss: PropTypes.func,
}

export default React.memo(AddScheduledSlotPanel)
