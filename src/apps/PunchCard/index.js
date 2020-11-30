import React from 'react';
import PropTypes from 'prop-types'
import {v4 as uuid} from 'uuid'
import {Stack} from '@fluentui/react'
import GoalForTheDayForm from './GoalForTheDayForm'
import PunchedSlots from './PunchedSlots'
import PunchInButton from './PunchInButton'

const PunchCardLayout = ({
  goalForTheDayForm, punchedSlots,
  punchInButton
}) => (
  <Stack vertical tokens={{childrenGap: 10}}>
    <GoalForTheDayForm {...goalForTheDayForm} />
    <PunchedSlots {...punchedSlots} />
    <PunchInButton {...punchInButton} />
  </Stack>
);

export const showPunchInButton = ({items}) => {
  if(!items.length) return true;
  const lastIndex = items.length - 1;
  const show = items[lastIndex].outTime;
  return Boolean(show);
}


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
  goalForTheDay, onChangeGoal,
  punchedSlots, onUpdatePunchSlot,
  onAddPunchedSlot
}) => {
  const punchCard = {
    goalForTheDayForm: {
      ...goalForTheDay,
      onChangeGoal
    },
    punchedSlots: {
      ...punchedSlots,
      onUpdatePunchSlot
    },
    primaryButton: {
      text: 'Punch In'
    },
    punchInButton: {
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
          items: punchedSlots.items
        }),
          [punchedSlots.items]
        )
    }
  }
  return <PunchCardLayout {...punchCard} />
}

PunchCard.propTypes = {
  onChangeGoal: PropTypes.func,
  goalForTheDay: PropTypes.object,
  items: PropTypes.array,
  onUpdatePunchSlot: PropTypes.func,
  onAddPunchedSlot: PropTypes.func
}

export default PunchCard;
