import React from 'react'
import PunchCardApp from './apps/PunchCardApp'
import db from './db'
import {v4 as uuid} from 'uuid'

const App = () => {
  const [state, setState] = React.useState({
    punchCards: [],
    selectedPunchCard: null,
    isPunchCardsPanelOpen: false
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
          hours: '00',
          minutes: '09'
        }
      };
      await db.punchCards.add(newPunchCard)
      setState(currentState => ({
        punchCards: [
          newPunchCard,
          ...currentState.punchCards,
        ]
      }))
    },[]),
    onDismissPunchCardPanel: React.useCallback(() => {
      setState(currentState => ({
        ...currentState,
        isPunchCardsPanelOpen: false
      }))
    },[]),
    onOpenPunchCardPanel: React.useCallback(() => {
      setState(currentState => ({
        ...currentState,
        isPunchCardsPanelOpen: true
      }))
    },[]),
    onDeletePunchCard: React.useCallback((id) => {

    },[]),
    onSelectPunchCard: React.useCallback(async(id) => {
      const selectedPunchCard = await db.punchCards.get(id)
      setState(currentState => ({
        ...currentState,
        selectedPunchCard,
        isPunchCardsPanelOpen: false
      }))
    },[]),
    onEditPunchCard: React.useCallback(() => {

    },[]),
  }

  React.useEffect(() => {
    db.punchCards.toArray(punchCards => {
      if(punchCards.length) {
        setState(currentState => ({
          punchCards,
          isPunchCardsPanelOpen: true
        }))
      }
    })
  },[])
  return <PunchCardApp {...punchCardApp}  />
}

export default React.memo(App)
