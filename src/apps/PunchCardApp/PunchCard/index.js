import React from 'react';
import PropTypes from 'prop-types'
import {v4 as uuid} from 'uuid'
import { Stack, Text } from '@fluentui/react'
import PunchedProgress from './PunchedProgress'
import GoalForTheDayForm from './GoalForTheDayForm'
import PunchedSlots from './PunchedSlots'
import PunchCardButtons from './PunchCardButtons'
import AddScheduledSlotPanel from './AddScheduledSlotPanel'
import Spinner from './Spinner'
import {messages} from '../shared'

const PunchCardLayout = ({
  show,
  text,
  goalForTheDayForm, punchedSlots,
  punchCardButtons, punchedProgress,
  addScheduledSlotPanel, spinner
}) => (
  show && <Stack vertical tokens={{childrenGap: 10}}>
    <Stack horizontal tokens={{childrenGap: 5}}>
      <Text {...text} /> <Spinner {...spinner} />
    </Stack>
    <AddScheduledSlotPanel {...addScheduledSlotPanel} />
    <GoalForTheDayForm {...goalForTheDayForm} />
    <PunchedSlots {...punchedSlots} />
    <PunchCardButtons {...punchCardButtons} />
    <PunchedProgress {...punchedProgress} />
  </Stack>
);

const {
  START_YOUR_DAY,  PUNCH_IN
} = messages;

export const enablePunchInButton = ({items}) => {
  if(!items.length) return true;
  const lastIndex = items.length - 1;
  const show = items[lastIndex].outTime;
  return Boolean(show);
}

export const getPercentComplete = ({items}) => {
  return 0.2;
}

export const getPunchInButtonText = (numberOfItems) => Boolean(numberOfItems) ? PUNCH_IN : START_YOUR_DAY;

/**
  The Punch Card Component will
  display the punch-card details
  such as `goal-for-the-day`,
  `punchedSlots`, etc.

  It also gives you an API for updating
  the goal for the punch-card with `onChangeGoal`, adding a punched-slot with
  `onAddPunchedSlot`, editing a punched-slot with
  `onUpdatePunchSlot`, etc.
*/
const PunchCard = ({
  id,
  punchedSlots, title,

  onUpdatePunchSlot,
  onAddPunchedSlot,
  onAddScheduledSlot,

  punchedSlotItems,
  scheduledSlots,
  onChangeGoal,
  goalHours, goalMinutes
}) => {
  const [state, setState] = React.useState({
    addScheduledSlotPanel: {
      isOpen: false
    },
    spinner: {
      show: false
    }
  });

  const updateAddScheduledSlotPanel = React.useCallback((update) => {
    setState(currentState => ({
      ...currentState,
      addScheduledSlotPanel: {
        ...currentState.addScheduledSlotPanel,
        ...update
      }
    }))
  },[]);

  const updateSpinner = React.useCallback((update) => {
    setState(currentState => ({
      ...currentState,
      spinner: {
          ...currentState.spinner,
          ...update
      }
    }))
  },[])

  const punchCard = {
    show: React.useMemo(() => Boolean(id), [id]),
    spinner: {
      ...state.spinner
    },
    text: {
      children: title,
      variant: 'large'
    },
    goalForTheDayForm: {
      hours: goalHours,
      minutes: goalMinutes,
      onChangeGoal: React.useCallback((update) => {
        onChangeGoal({
          goalForTheDay: {
            hours: goalHours,
            minutes: goalMinutes,
            ...update
          }
        })
      }, [onChangeGoal, goalHours, goalMinutes])
    },
    punchedSlots: {
      onUpdatePunchSlot: React.useCallback(async(updatedItem) => {
        updateSpinner({show: true})
        try {
          const updatedPunchSlotItems = punchedSlotItems
            .map(item => updatedItem.id === item.id ? ({
              ...item,
              ...updatedItem
            }) : item)
          await onUpdatePunchSlot({
            slots: updatedPunchSlotItems
          });
        } catch (e) {
          console.error('punch-slot did not update', e)
        } finally {
          updateSpinner({show: false})
        }
      },[punchedSlotItems, onUpdatePunchSlot, updateSpinner]),
      items: punchedSlotItems
    },
    punchCardButtons: {
      punchInText: React.useMemo(
        () => getPunchInButtonText(punchedSlotItems.length),
      [punchedSlotItems.length]),
      onClickPunchIn: React.useCallback(() => {
        const newPunchedSlot = {
          id: uuid(),
          inTime: Date.now(),
          outTime: null
        };
        onAddPunchedSlot({
          slots: [
            ...punchedSlotItems,
            newPunchedSlot
          ]
        })
      },[onAddPunchedSlot, punchedSlotItems]),
      onClickAddScheduledSlot: React.useCallback(() => {
        updateAddScheduledSlotPanel({isOpen: true})
      },[updateAddScheduledSlotPanel]),
      punchInDisabled: React.useMemo(
        () => !enablePunchInButton({
          items: punchedSlotItems
        }),
          [punchedSlotItems]
        ),
      showIcon: React.useMemo(
        () => Boolean(punchedSlotItems.length),
        [punchedSlotItems.length]
      )
    },
    punchedProgress: {
      show: React.useMemo(
        () => Boolean(punchedSlotItems.length),
        [punchedSlotItems.length]
      ),
      progress: React.useMemo(
        () => getPercentComplete({
          items: punchedSlotItems
        }),
        [punchedSlotItems]
      )
    },
    addScheduledSlotPanel: {
      ...state.addScheduledSlotPanel,
      onAddScheduledSlot: React.useCallback((scheduledSlot) => {
        onAddScheduledSlot({
          scheduledSlots: [
            ...scheduledSlots,
            scheduledSlot
          ]
        })
        updateAddScheduledSlotPanel({
          isOpen: false
        })
      },[updateAddScheduledSlotPanel, onAddScheduledSlot,
        scheduledSlots]),
      onDismiss: React.useCallback(() => {
        updateAddScheduledSlotPanel({isOpen: false})
      },[updateAddScheduledSlotPanel])
    }
  }

  return <PunchCardLayout {...punchCard} />
}

PunchCard.propTypes = {
  id: PropTypes.string,

  goalHours: PropTypes.string,
  goalMinutes: PropTypes.string,

  punchedSlotItems: PropTypes.array,

  onChangeGoal: PropTypes.func,
  onUpdatePunchSlot: PropTypes.func,
  onAddPunchedSlot: PropTypes.func,
  // onClickAddScheduledSlot: PropTypes.func,
  onAddScheduledSlot: PropTypes.func,
}

PunchCard.defaultProps = {
  punchedSlotItems: []
}

export default React.memo(PunchCard);
