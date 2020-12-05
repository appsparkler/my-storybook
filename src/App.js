import React from 'react'
import PunchCardApp from './apps/PunchCardApp'

const App = () => {
  const  punchCardApp = {
    isPunchCardsPanelOpen: false,
    punchCards: [],
    selectedPunchCard: null,
    onAddPunchCard: React.useCallback(() => {

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
