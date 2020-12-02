import React from 'react';
import PropTypes from 'prop-types'
import {v4 as uuid} from 'uuid'
import { Stack } from '@fluentui/react'
import PunchedProgress from './PunchedProgress'
import GoalForTheDayForm from './GoalForTheDayForm'
import PunchedSlots from './PunchedSlots'
import PunchCardButtons from './PunchCardButtons'
import {messages} from '../shared'

const PunchCardLayout = ({
  show,
  goalForTheDayForm, punchedSlots,
  punchCardButtons, punchedProgress
}) => (
  show && <Stack vertical tokens={{childrenGap: 10}}>
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
  punchedSlots, onUpdatePunchSlot,
  onAddPunchedSlot, onClickAddScheduledSlot,

  punchedSlotItems,
  onChangeGoal,
  goalHours, goalMinutes
}) => {
  const punchCard = {
    show: React.useMemo(() => Boolean(id), [id]),
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
      onUpdatePunchSlot: React.useCallback((updatedItem) => {
        const updatedPunchSlotItems = punchedSlotItems
          .map(item => updatedItem.id === item.id ? ({
            ...item,
            ...updatedItem
          }) : item)
        onUpdatePunchSlot({
          slots: updatedPunchSlotItems
        });
      },[punchedSlotItems, onUpdatePunchSlot]),
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
      onClickAddScheduledSlot,
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
  onClickAddScheduledSlot: PropTypes.func,
}

PunchCard.defaultProps = {
  punchedSlotItems: []
}

export default React.memo(PunchCard);
