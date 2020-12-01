import React from 'react';
import PropTypes from 'prop-types'
import {DefaultButton} from '@fluentui/react'

const AddScheduledSlotButtonLayout = ({
  show, defaultButton
}) => show && <DefaultButton {...defaultButton} />

const AddScheduledSlotButton = ({
  onClick, show
}) => {
  const [state] = React.useState({
    defaultButton: {
      text: 'Add Scheduled Slot',
      iconProps: {
        iconName: 'Add'
      }
    }
  })

  const addScheduledSlotButton = {
    show,
    defaultButton: {
      ...state.defaultButton,
      onClick
    }
  }
  return (
    <AddScheduledSlotButtonLayout {...addScheduledSlotButton} />
  )
}

AddScheduledSlotButton.propTypes = {
  onClick: PropTypes.func,
  show: PropTypes.bool
}

AddScheduledSlotButton.defaultProps = {
  show: false
}

export default React.memo(AddScheduledSlotButton)
