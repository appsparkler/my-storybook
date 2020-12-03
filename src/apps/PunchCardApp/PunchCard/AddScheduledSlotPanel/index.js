import React from 'react'
import PropTypes from 'prop-types'
import {Panel} from '@fluentui/react'
import ScheduledSlotForm from '../ScheduledSlotForm'

const AddScheduledSlotPanelLayout = ({
  panel, scheduledSlotForm
}) => (
  <Panel {...panel}>
    <ScheduledSlotForm {...scheduledSlotForm} />
  </Panel>
)

const AddScheduledSlotPanel = ({
  isOpen, onAddScheduledSlot
}) => {

  const addScheduledSlotPanel = {
    scheduledSlotForm: {
      onSubmit: onAddScheduledSlot
    },
    panel: {
      isLightDismiss: true,
      isOpen,
      headerText: 'Add Scheduled Slot'
    }
  }

  return <AddScheduledSlotPanelLayout {...addScheduledSlotPanel} />
}

AddScheduledSlotPanel.propTypes = {
  isOpen: PropTypes.bool,
  onAddScheduledSlot: PropTypes.func,
}

export default React.memo(AddScheduledSlotPanel);
