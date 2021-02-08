import React from 'react'
import PropTypes from 'prop-types'
import { Panel, Stack } from '@appsparkler/fluentui-react'
import PunchCardsList from './PunchCards'

const PunchCardsPanelLayout = ({ show, panel, punchCardsList }) =>
  show && (
    <Panel {...panel}>
      <Stack vertical>
        <PunchCardsList {...punchCardsList} />
      </Stack>
    </Panel>
  )

PunchCardsPanelLayout.defaultProps = {
  show: false,
}

const PunchCardsPanel = ({
  items,
  isOpen,
  onDismiss,
  onDeletePunchCard,
  onSelectPunchCard,
}) => {
  const [state, setState] = React.useState({
    panel: {
      isOpen: true,
    },
    punchCardsList: {
      punchCards: [],
    },
  })

  const updatePunchCardsList = React.useCallback((update) => {
    setState((currentState) => ({
      ...currentState,
      punchCardsList: {
        ...currentState.punchCardsList,
        ...update,
      },
    }))
  }, [])

  const punchCardsPanel = {
    show: isOpen,
    panel: {
      isOpen,
      onDismiss,
      headerText: 'Punch Cards',
    },
    punchCardsList: {
      ...state.punchCardsList,
    },
  }

  React.useEffect(() => {
    const updatedItems = items.map((item) => ({
      ...item,
      onEdit: () => onSelectPunchCard(item.id),
      onDelete: () => onDeletePunchCard(item.id),
    }))
    updatePunchCardsList({
      punchCards: updatedItems,
    })
  }, [items, updatePunchCardsList, onSelectPunchCard, onDeletePunchCard])

  return <PunchCardsPanelLayout {...punchCardsPanel} />
}

PunchCardsPanel.propTypes = {
  onDeletePunchCard: PropTypes.func,
  onSelectPunchCard: PropTypes.func,
  onDismiss: PropTypes.func,
  isOpen: PropTypes.bool,
  items: PropTypes.array,
}

PunchCardsPanel.defaultProps = {
  items: [],
}

export default React.memo(PunchCardsPanel)
