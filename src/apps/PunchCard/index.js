import React from 'react';
import PropTypes from 'prop-types'
import {v4 as uuid} from 'uuid'
import {Stack} from '@fluentui/react'
import PunchedProgress from './PunchedProgress'
import GoalForTheDayForm from './GoalForTheDayForm'
import PunchedSlots from './PunchedSlots'
import PunchInButton from './PunchInButton'
import {messages} from './shared'

const PunchCardLayout = ({
  goalForTheDayForm, punchedSlots,
  punchInButton, punchedProgress
}) => (
  <Stack vertical tokens={{childrenGap: 10}}>
    <GoalForTheDayForm {...goalForTheDayForm} />
    <PunchedSlots {...punchedSlots} />
    <PunchInButton {...punchInButton} />
    <PunchedProgress {...punchedProgress} />
  </Stack>
);

const {
  START_YOUR_DAY,  PUNCH_IN
} = messages;

export const showPunchInButton = ({items}) => {
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
  punchedSlots, onUpdatePunchSlot,
  onAddPunchedSlot,

  punchedSlotItems,
  onChangeGoal,
  goalHours, goalMinutes
}) => {
  const punchCard = {
    goalForTheDayForm: {
      hours: goalHours,
      minutes: goalMinutes,
      onChangeGoal
    },
    punchedSlots: {
      // ...punchedSlots,
      onUpdatePunchSlot,
      items: punchedSlotItems
    },
    punchInButton: {
      text: React.useMemo(
        () => getPunchInButtonText(punchedSlotItems.length),
      [punchedSlotItems.length]),
      onClick: React.useCallback(() => {
        const newPunchedSlot = {
          id: uuid(),
          inTime: Date.now(),
          outTime: null
        };
        onAddPunchedSlot(newPunchedSlot)
      },[onAddPunchedSlot]),
      show: React.useMemo(
        () => showPunchInButton({
          items: punchedSlotItems
        }),
          [punchedSlotItems]
        ),
      hasIcon: React.useMemo(
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
  onChangeGoal: PropTypes.func,
  goalHours: PropTypes.string,
  goalMinutes: PropTypes.string,

  punchedSlotItems: PropTypes.array,

  items: PropTypes.array,
  onUpdatePunchSlot: PropTypes.func,
  onAddPunchedSlot: PropTypes.func,
}

PunchCard.defaultProps = {
  punchedSlotItems: []
}

export default React.memo(PunchCard);
