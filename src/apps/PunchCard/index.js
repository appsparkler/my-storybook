import React from 'react';
import PropTypes from 'prop-types'
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

const PunchCard = ({
  goalForTheDay, onChangeGoal,
  punchedSlots, onUpdatePunchSlot,
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
      onClick: onUpdatePunchSlot,
      show: React.useMemo(
        () => !showPunchInButton(),
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
  onUpdatePunchSlot: PropTypes.func
}

export default PunchCard;
