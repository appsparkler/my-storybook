import React from 'react';
// import PropTypes from 'prop-types';
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

const PunchCard = () => {
  const [state, setState] = React.useState({
    goalForTheDayForm: {},
    punchedSlots: {
      items: []
    }
  })

  const updateGoalForTheDay = React.useCallback((update) => {
    setState(currentState => ({
      ...currentState,
      goalForTheDayForm: {
        ...currentState.goalForTheDayForm,
        ...update
      }
    }))
  }, []);

  const punchCard = {
    goalForTheDayForm: {
      ...state.goalForTheDayForm,
      onChangeGoal: updateGoalForTheDay
    }
  }

  return <PunchCardLayout {...punchCard} />
}
//
// PunchCard.propTypes = {
//
// };
//
// PunchCard.defaultProps = {
//
// }

export default React.memo(PunchCard);
