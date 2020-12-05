import React from 'react';
import {Stack} from '@fluentui/react'
import PropTypes from 'prop-types'
import PunchCard from './PunchCard'
import NewPunchCardForm from './NewPunchCardForm'
import PunchCardsPanel from './PunchCardsPanel'
import ShowPunchCardsButton from './ShowPunchCardsButton'

const PunchCardAppLayout = ({
  selectedPunchCard, newPunchCardForm,
  punchCardsPanel, showPunchCardsButton
}) => (
  <Stack tokens={{childrenGap: 10}}>
    <PunchCardsPanel {...punchCardsPanel} />
    <Stack.Item>
      <Stack horizontal tokens={{childrenGap: 10}}>
        <NewPunchCardForm {...newPunchCardForm}/>
        <ShowPunchCardsButton {...showPunchCardsButton}/>
      </Stack>
    </Stack.Item>
    <PunchCard {...selectedPunchCard}/>
  </Stack>
);

const PunchCardApp =  ({
  onAddPunchCard,
  punchCards,
  selectedPunchCard,

  isPunchCardsPanelOpen, onDismissPunchCardPanel,
  onDeletePunchCard, onSelectPunchCard,

  onEditPunchCard
}) => {

  const [state, setState] = React.useState({
    punchCardsPanel: {
      isOpen: false
    },
  })

  const updatePunchCardPanel = React.useCallback((update) => {
    setState((currentState) => ({
      ...currentState,
      punchCardsPanel: {
        ...currentState.punchCardsPanel,
        ...update
      }
    }))
  }, [])

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
      onSubmit: onAddPunchCard
    },
    punchCardsPanel: {
      ...state.punchCardsPanel,
      items: punchCards,
      onDeletePunchCard, onSelectPunchCard,
      onDismiss: React.useCallback(() => {
        updatePunchCardPanel({
          isOpen: false
        })
      }, [updatePunchCardPanel]),
    },
    showPunchCardsButton: {
      disabled: React.useMemo(() => !punchCards.length, [punchCards.length]),
      onClick: React.useCallback(() => {
        updatePunchCardPanel({isOpen: true})
      }, [updatePunchCardPanel])
    }
  }

  React.useEffect(() => {
    updatePunchCardPanel({
      isOpen: isPunchCardsPanelOpen
    })
  }, [isPunchCardsPanelOpen,  updatePunchCardPanel])

  return <PunchCardAppLayout {...punchCardApp} />
}

PunchCardApp.propTypes = {
  selectedPunchCard: PropTypes.object,
  onAddPunchCard: PropTypes.func,
  onDismissPunchCardPanel: PropTypes.func,
  punchCards: PropTypes.array,
  isPunchCardsPanelOpen: PropTypes.bool,
  onDeletePunchCard: PropTypes.func,
  onSelectPunchCard: PropTypes.func,
  onEditPunchCard: PropTypes.func
}

PunchCardApp.defaultProps = {
  punchCards: [],
  isPunchCardsPanelOpen: false
}

/*
const PunchCardApp1 = ({
  punchCard, onEditPunchCard,
  onAddNewPunchCard
}) => {

  const [state, setState] = React.useState({
    punchCardPanel: {
      isOpen: false
    }
  })

  const updatePunchCardPanel = React.useCallback((update) => {
    setState(currentState => ({
      ...currentState,
      punchCardPanel: {
        ...currentState.punchCardPanel,
        ...update
      }
    }))
  }, [])

  const punchCardApp = {
    newPunchCardForm: {
      onSubmit: React.useCallback((title) => {
        const newPunchCard = {
          title,
          id: uuid(),
          goalForTheDay: {
            hours: '09',
            minutes: '00'
          },
          punchedSlots: [],
          scheduledSlots: []
        }
        onAddNewPunchCard(newPunchCard);
      }, [onAddNewPunchCard])
    },
    punchCard: {
      ...punchCard,
      onChangeGoal: onEditPunchCard,
      onUpdatePunchSlot: onEditPunchCard,
      onAddPunchedSlot: onEditPunchCard,
      onClickAddScheduledSlot: onEditPunchCard,
      onAddScheduledSlot: onEditPunchCard,
      onDeleteScheduledSlot: onEditPunchCard,
      onChangeScheduledSlot: onEditPunchCard
    },
    punchCardsPanel: {
      isOpen: state.punchCardPanel.isOpen,
      items: [],
      onSelectPunchCard: () => {},
      onDeletePunchCard: () => {},
      onDismiss: React.useCallback(() => {
        updatePunchCardPanel({
          isOpen: false
        })
      },[updatePunchCardPanel]),
    },
    showPunchCardsButton: {
      onClick: React.useCallback(() => {
        updatePunchCardPanel({
          isOpen: true
        })
      },[updatePunchCardPanel])
    }
  }

  return <PunchCardAppLayout {...punchCardApp} />
}

PunchCardApp1.propTypes = {
  onEditPunchCard: PropTypes.func,
  onAddNewPunchCard: PropTypes.func,
  punchCard: PropTypes.object
}
*/
export default React.memo(PunchCardApp);
