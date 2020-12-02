import React from 'react';
import {Stack} from '@fluentui/react'
import PropTypes from 'prop-types'
import PunchCard from './PunchCard'
import NewPunchCardForm from './NewPunchCardForm'
import {v4 as uuid} from 'uuid'

const PunchCardAppLayout = ({
  punchCard, newPunchCardForm
}) => (
  <Stack tokens={{childrenGap: 10}}>
    <NewPunchCardForm {...newPunchCardForm}/>
    <PunchCard {...punchCard}/>
  </Stack>
);

const PunchCardApp = ({
  punchCard, onEditPunchCard,
  onAddNewPunchCard
}) => {
  const punchCardApp = {
    show: React.useMemo(
      () => Boolean(punchCard.id),
      [punchCard.id]
    ),
    newPunchCardForm: {
      onSubmit: React.useCallback((title) => {
        const newPunchCard = {
          title,
          id: uuid(),
          goalForTheDay: {
            hours: '09',
            minutes: '00'
          },
          punchedSlots: []
        }
        onAddNewPunchCard(newPunchCard);
      }, [onAddNewPunchCard])
    },
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
  onAddNewPunchCard: PropTypes.func,
  punchCard: PropTypes.object
}

export default React.memo(PunchCardApp);
