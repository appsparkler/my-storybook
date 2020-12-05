import React from 'react'
import PunchCardApp from './apps/PunchCardApp'
import db from './db'
import {v4 as uuid} from 'uuid'

const App = () => {
  const [state, setState] = React.useState({
    punchCards: []
  })

  const  punchCardApp = {
    ...state,
    isPunchCardsPanelOpen: false,
    selectedPunchCard: null,
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

    },[]),
    onDeletePunchCard: React.useCallback(() => {

    },[]),
    onSelectPunchCard: React.useCallback(() => {

    },[]),
    onEditPunchCard: React.useCallback(() => {

    },[]),
  }
  return <PunchCardApp {...punchCardApp}  />
}

export default React.memo(App)
