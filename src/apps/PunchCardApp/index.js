import React from 'react';
import {Stack} from '@fluentui/react'
import PropTypes from 'prop-types'
import PunchCard from './PunchCard'
import NewPunchCardForm from './NewPunchCardForm'
import PunchCardsPanel from './ShowPunchCardsButton/PunchCardsPanel'
import ShowPunchCardsButton from './ShowPunchCardsButton'

const PunchCardAppLayout = ({
  selectedPunchCard, newPunchCardForm,
  punchCardsPanel, showPunchCardsButton
}) => (
  <Stack tokens={{childrenGap: 10}}>
    <Stack tokens={{childrenGap: 10}}>
      <PunchCardsPanel {...punchCardsPanel} />
      <Stack.Item>
        <Stack horizontal tokens={{childrenGap: 10}}>
          <NewPunchCardForm {...newPunchCardForm}/>
          <ShowPunchCardsButton {...showPunchCardsButton}/>
        </Stack>
      </Stack.Item>
      <div className="ms-Grid" dir="ltr">
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-hiddenSm ms-md2 ms-lg3"></div>
          <div className="ms-Grid-col ms-sm12 ms-md8 ms-lg6 ms-depth-4">
            <Stack tokens={{padding: 5}}>
              <PunchCard {...selectedPunchCard}/>
            </Stack>
          </div>
          <div className="ms-Grid-col ms-hiddenSm ms-md2 ms-lg3"></div>
        </div>
      </div>
    </Stack>
  </Stack>
);

const PunchCardApp =  ({
  onAddPunchCard,
  punchCards,
  selectedPunchCard,

  isOpenPunchCardsPanel, onDismissPunchCardPanel,
  onDeletePunchCard, onSelectPunchCard,
  onClickShowPunchCardsButton,

  onEditPunchCard
}) => {

  const punchCardApp = {
    selectedPunchCard: {
      ...selectedPunchCard,
      onChangeGoal: onEditPunchCard,
      onUpdatePunchSlot: onEditPunchCard,
      onAddPunchedSlot: onEditPunchCard,
      onAddScheduledSlot: onEditPunchCard,
      onDeleteScheduledSlot: onEditPunchCard,
      onChangeScheduledSlot: onEditPunchCard
    },
    newPunchCardForm: {
      onSubmit: React.useCallback(async(punchCardName) => {
        await onAddPunchCard(punchCardName)
      },[onAddPunchCard])
    },
    showPunchCardsButton: {
      isOpenPanel: isOpenPunchCardsPanel,
      items: punchCards,
      onDeletePunchCard, onSelectPunchCard,
      onDismiss: onDismissPunchCardPanel,
      disabled: React.useMemo(() => !punchCards.length, [punchCards.length]),
      onClick: onClickShowPunchCardsButton
    }
  }

  return <PunchCardAppLayout {...punchCardApp} />
}

PunchCardApp.propTypes = {
  selectedPunchCard: PropTypes.object,
  onAddPunchCard: PropTypes.func,
  onDismissPunchCardPanel: PropTypes.func,
  onClickShowPunchCardsButton: PropTypes.func,
  punchCards: PropTypes.array,
  isOpenPunchCardsPanel: PropTypes.bool,
  onDeletePunchCard: PropTypes.func,
  onSelectPunchCard: PropTypes.func,
  onEditPunchCard: PropTypes.func
}

PunchCardApp.defaultProps = {
  punchCards: [],
  isOpenPunchCardsPanel: false
}

export default React.memo(PunchCardApp);
