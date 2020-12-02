import React from 'react'
import PropTypes from 'prop-types'
import {Panel} from '@fluentui/react'
import ScheduledSlotForm from '../ScheduledSlotForm'

const AddScheduledSlotPanel = ({
  isOpen, onAddScheduledSlot
}) => {

  const scheduledSlotForm = {
    onSubmit: onAddScheduledSlot
  }

  const panel = {
    isLightDismiss: true,
    isOpen,
    children: <ScheduledSlotForm
      {...scheduledSlotForm}
    />,
    headerText: 'Add Scheduled Slot'
  }

  return (
    <Panel {...panel}>
      <ScheduledSlotForm {...scheduledSlotForm} />
    </Panel>
  )
}

AddScheduledSlotPanel.propTypes = {
  isOpen: PropTypes.bool,
  onAddScheduledSlot: PropTypes.func,
}

export default React.memo(AddScheduledSlotPanel);
