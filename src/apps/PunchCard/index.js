import React from 'react';
import PropTypes from 'prop-types'
import {Stack, PrimaryButton} from '@fluentui/react'
import GoalForTheDayForm from './GoalForTheDayForm'
import PunchedSlots from './PunchedSlots'

const PunchCardLayout = ({
  goalForTheDayForm, punchedSlots,
  primaryButton
}) => (
  <Stack vertical tokens={{childrenGap: 10}}>
    <GoalForTheDayForm {...goalForTheDayForm} />
    <PunchedSlots {...punchedSlots} />
    <PrimaryButton {...primaryButton} />
  </Stack>
);

const PunchCard = ({
  goalForTheDay, onChangeGoal,
  punchedSlots, onUpdatePunchSlot
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
