import React from 'react'
import PunchCardApp from './apps/PunchCardApp'
import db from './db'
import {v4 as uuid} from 'uuid'

const App = () => {
  const [state, setState] = React.useState({
    punchCards: [],
    selectedPunchCard: null,
    isOpenPunchCardsPanel: false
  })

  const  punchCardApp = {
    ...state,
    onAddPunchCard: React.useCallback(async(title) => {
      const newPunchCard = {
        id: uuid(),
        title,
        punchedSlots: [],
        scheduledSlots: [],
        goalForTheDay: {
          hours: '09',
          minutes: '00'
        }
      };
      await db.punchCards.add(newPunchCard)
      setState(currentState => ({
        punchCards: [
          newPunchCard,
          ...currentState.punchCards,
        ],
        isOpenPunchCardsPanel: true
      }))
    },[]),
    onDismissPunchCardPanel: React.useCallback(() => {
      setState(currentState => ({
        ...currentState,
        isOpenPunchCardsPanel: false
      }))
    },[]),
    onOpenPunchCardPanel: React.useCallback(() => {
      setState(currentState => ({
        ...currentState,
        isOpenPunchCardsPanel: true
      }))
    },[]),
    onDeletePunchCard: React.useCallback(async (id) => {
      await db.punchCards.delete(id);
      setState(currentState => {
        const punchCards = currentState.punchCards
          .filter(punchCard => id !== punchCard.id)
        const isOpenPunchCardsPanel = Boolean(punchCards.length);
        const selectedPunchCard = (() => {
          if(!currentState.selectedPunchCard) return null
          const isSelectedPunchCard = id === currentState.selectedPunchCard.id;
          if(isSelectedPunchCard) return null
          return currentState.selectedPunchCard
        })()
        return {
          ...currentState,
          isOpenPunchCardsPanel,
          punchCards,
          selectedPunchCard
        }
      })
    },[]),
    onSelectPunchCard: React.useCallback(async(id) => {
      const selectedPunchCard = await db.punchCards.get(id)
      setState(currentState => ({
        ...currentState,
        selectedPunchCard,
        isOpenPunchCardsPanel: false
      }))
    },[]),
    onEditPunchCard: React.useCallback(() => {

    },[]),
    onClickShowPunchCardsButton: React.useCallback(() => {
      setState(currentState => ({
        ...currentState,
        isOpenPunchCardsPanel: true
      }))
    },[]),
  }

  React.useEffect(() => {
    db.punchCards.toArray(punchCards => {
      if(punchCards.length) {
        setState(currentState => ({
          punchCards,
          isOpenPunchCardsPanel: true
        }))
      }
    })
  },[])

  return <PunchCardApp {...punchCardApp}  />
}

export default React.memo(App)
