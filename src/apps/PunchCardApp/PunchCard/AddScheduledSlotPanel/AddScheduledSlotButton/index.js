import React from 'react';
import PropTypes from 'prop-types'
import AddScheduledSlotPanel from '../'
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

  const setAddScheduledSlotPanel = React.useCallback((update) => {
      setState(currentState => ({
        ...currentState,
        addScheduledSlotPanel: {
          ...currentState.addScheduledSlotPanel,
          ...update(currentState.addScheduledSlotPanel)
        }
      }))
  },[])

  const addScheduledSlotButton = {
    // defaultButton: {
    //   className: 'ms-hiddenSm',
    //   text: 'Add Scheduled Slot',
    //   iconProps: {
    //     iconName: 'Add'
    //   },
    //   onClick: onClickAddScheduledSlot
    // },
    // iconButton: {
    //   className: 'ms-hiddenMdUp',
    //   iconProps: {
    //     iconName: 'Add'
    //   },
    //   onClick: onClickAddScheduledSlot
    // },
    defaultButton: {
      className: 'ms-hiddenSm',
      text: 'Add Scheduled Slot',
      iconProps: {
        iconName: 'Add'
      },
      onClick: React.useCallback(() => {
        setAddScheduledSlotPanel(currentState => ({
          ...currentState,
          isOpen: true
        }))
      }, [setAddScheduledSlotPanel])
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
      onAddScheduledSlot,
      onDismiss: React.useCallback(() => {
        setAddScheduledSlotPanel(currentState => ({
          ...currentState,
          isOpen: false
        }))
      },[setAddScheduledSlotPanel])
    }
  }

  return <AddScheuduledSlotButtonLayout {...addScheduledSlotButton} />
}

AddScheduledSlotButton.propTypes = {
  onAddScheduledSlot: PropTypes.func
}

export default React.memo(AddScheduledSlotButton);
