import React from 'react';
import PropTypes from 'prop-types'
import AddScheduledSlotPanel from './AddScheduledSlotPanel'
import {DefaultButton, IconButton} from '@fluentui/react'

const AddScheuduledSlotButtonLayout = ({
  addScheduledSlotPanel,
  defaultButton, iconButton
}) => (
  <>
    <DefaultButton {...defaultButton} />
    <IconButton {...iconButton}/>
    <AddScheduledSlotPanel {...addScheduledSlotPanel} />
  </>
);

const AddScheduledSlotButton = ({
  onAddScheduledSlot
}) => {
  const [state, setState] = React.useState({
    defaultButton: {},
    iconButton: {},
    addScheduledSlotPanel: {
      isOpen: false
    }
  })

  const updateAddScheduledSlotPanel = React.useCallback((update) => {
      setState(currentState => ({
        ...currentState,
        addScheduledSlotPanel: {
          ...currentState.addScheduledSlotPanel,
          ...update
        }
      }))
  },[])

  const addScheduledSlotButton = {
    defaultButton: {
      className: 'ms-hiddenSm',
      text: 'Add Scheduled Slot',
      iconProps: {
        iconName: 'Add'
      },
      onClick: React.useCallback(() => {
        updateAddScheduledSlotPanel({
          isOpen: true
        })
      }, [updateAddScheduledSlotPanel])
    },
    iconButton: {
      className: 'ms-hiddenMdUp',
      iconProps: {
        iconName: 'Add'
      },
      onClick: () => addScheduledSlotButton.defaultButton.onClick()
    },
    addScheduledSlotPanel: {
      ...state.addScheduledSlotPanel,
      onAddScheduledSlot: React.useCallback((...args) => {
        updateAddScheduledSlotPanel({
          isOpen: false
        })
        onAddScheduledSlot(...args)
      },[updateAddScheduledSlotPanel, onAddScheduledSlot]),
      onDismiss: React.useCallback(() => {
        updateAddScheduledSlotPanel({
          isOpen: false
        })
      },[updateAddScheduledSlotPanel])
    }
  }

  return <AddScheuduledSlotButtonLayout {...addScheduledSlotButton} />
}

AddScheduledSlotButton.propTypes = {
  onAddScheduledSlot: PropTypes.func
}

export default React.memo(AddScheduledSlotButton);
