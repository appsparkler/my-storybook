import React from 'react';
import PropTypes from 'prop-types'
import {Panel, Stack} from '@fluentui/react'
import PunchCardsList  from './PunchCards'

const PunchCardsPanelLayout = ({
  show, panel, punchCardsList
}) => show && (
  <Panel {...panel}>
    <Stack vertical>
      <PunchCardsList {...punchCardsList} />
    </Stack>
  </Panel>
);

const PunchCardsPanel = ({
  items, isOpen,
  onDismiss, onDeletePunchCard,
  onSelectPunchCard,
  on
}) => {
  const [state, setState] = React.useState({
    panel: {
      isOpen: true
    },
    punchCardsList: {
      punchCards: []
    }
  })

  const updatePanel = React.useCallback((update) => {
    setState(currentState => ({
      ...currentState,
      panel: {
        ...currentState.panel,
        ...update
      }
    }))
  }, [])

  const updatePunchCardsList = React.useCallback((update) => {
    setState(currentState => ({
      ...currentState,
      punchCardsList: {
        ...currentState.punchCardsList,
        ...update
      }
    }))
  }, [])

  const punchCardsPanel = {
    show: React.memo(
      () => state.panel.isOpen,
      [state.panel.isOpen]
    ),
    panel: {
      ...state.panel,
      headerText:'Punch Cards',
      onDismiss: React.useCallback(() => {
        updatePanel({isOpen: false})
        onDismiss()
      },[updatePanel, onDismiss])
    },
    punchCardsList: {
      ...state.punchCardsList
    }
  }

  React.useEffect(() => {
    const updatedItems = items.map((item) => ({
      ...item,
      onEdit: () => onSelectPunchCard(item.id),
      onDelete: () => onDeletePunchCard(item.id)
    }))
    updatePunchCardsList({
      punchCards: updatedItems
    })
  }, [items, updatePunchCardsList, onSelectPunchCard, onDeletePunchCard])

  React.useEffect(() => {
    updatePanel({
      isOpen
    })
  }, [isOpen, updatePanel])

  return <PunchCardsPanelLayout
    {...punchCardsPanel}
  />
}

PunchCardsPanel.propTypes = {
  onDeletePunchCard: PropTypes.func.isRequired,
  onSelectPunchCard: PropTypes.func.isRequired,
  onDismiss: PropTypes.func,
  isOpen: PropTypes.bool,
  items: PropTypes.array,
}

export default React.memo(PunchCardsPanel)
