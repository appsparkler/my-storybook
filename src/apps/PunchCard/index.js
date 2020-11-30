import React from 'react';
import PropTypes from 'prop-types'
import {Stack} from '@fluentui/react'
import GoalForTheDayForm from './GoalForTheDayForm'
import PunchedSlots from './PunchedSlots'

const PunchCardLayout = ({
  goalForTheDayForm, punchedSlots
}) => (
  <Stack vertical>
    <GoalForTheDayForm {...goalForTheDayForm} />
    <PunchedSlots {...punchedSlots} />
  </Stack>
);

const PunchCard = ({
  goalForTheDay, onChangeGoal,
  punchedSlots,
}) => {
  const punchCard = {
    goalForTheDayForm: {
      ...goalForTheDay,
      onChangeGoal
    },
    punchedSlots: {
      ...punchedSlots
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
