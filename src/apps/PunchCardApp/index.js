import React from 'react';
import {Stack} from '@fluentui/react'
import PropTypes from 'prop-types'
import PunchCard from './PunchCard'

const PunchCardAppLayout = ({
  punchCard
}) => (
  <Stack>
    <PunchCard {...punchCard}/>
  </Stack>
);

const PunchCardApp = ({
  punchCard, onEditPunchCard
}) => {
  const punchCardApp = {
    show: React.useMemo(
      () => Boolean(punchCard.id),
      [punchCard.id]
    ),
    punchCard: {
      ...punchCard,
      onChangeGoal: onEditPunchCard,
      onUpdatePunchSlot: onEditPunchCard,
      onAddPunchedSlot: onEditPunchCard,
      onClickAddScheduledSlot: onEditPunchCard
    }
  }
  return <PunchCardAppLayout {...punchCardApp} />
}

PunchCardApp.propTypes = {
  onEditPunchCard: PropTypes.func,
  punchCard: PropTypes.object
}

export default React.memo(PunchCardApp);
