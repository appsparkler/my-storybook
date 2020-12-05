import React from 'react'
import PunchCardApp from './apps/PunchCardApp'
import db from './db'
import {v4 as uuid} from 'uuid'

const App = () => {
  const [state, setState] = React.useState({
    punchCards: [],
    isPunchCardsPanelOpen: false
  })

  const  punchCardApp = {
    ...state,
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

  React.useEffect(() => {
    db.punchCards.toArray(punchCards => {
      debugger;
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
