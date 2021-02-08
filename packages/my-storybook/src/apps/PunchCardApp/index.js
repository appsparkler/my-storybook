import React from 'react'
import { Stack } from '@appsparkler/fluentui-react'
import PropTypes from 'prop-types'
import PunchCard from './PunchCard'
import NewPunchCardForm from './NewPunchCardForm'
import PunchCardsPanel from './ShowPunchCardsButton/PunchCardsPanel'
import ShowPunchCardsButton from './ShowPunchCardsButton'

// TODO - PROVIDE option to save scheduled slots

const PunchCardAppLayout = ({
  selectedPunchCard,
  newPunchCardForm,
  punchCardsPanel,
  showPunchCardsButton,
}) => (
  <Stack tokens={{ childrenGap: 10, padding: 5 }}>
    <Stack tokens={{ childrenGap: 10 }}>
      <PunchCardsPanel {...punchCardsPanel} />
      <Stack.Item>
        <Stack horizontal tokens={{ childrenGap: 10 }}>
          <NewPunchCardForm {...newPunchCardForm} />
          <ShowPunchCardsButton {...showPunchCardsButton} />
        </Stack>
      </Stack.Item>
      <PunchCard {...selectedPunchCard} />
    </Stack>
  </Stack>
)

const PunchCardApp = ({
  onAddPunchCard,
  punchCards,
  selectedPunchCard,

  isOpenPunchCardsPanel,
  onDismissPunchCardPanel,
  onDeletePunchCard,
  onSelectPunchCard,
  onClickShowPunchCardsButton,

  onEditPunchCard,
}) => {
  const punchCardApp = {
    selectedPunchCard: {
      ...selectedPunchCard,
      onChangeGoal: onEditPunchCard,
      onUpdatePunchSlot: onEditPunchCard,
      onAddPunchedSlot: onEditPunchCard,
      onAddScheduledSlot: onEditPunchCard,
      onDeleteScheduledSlot: onEditPunchCard,
      onChangeScheduledSlot: onEditPunchCard,
    },
    newPunchCardForm: {
      onSubmit: React.useCallback(
        async (punchCardName) => {
          await onAddPunchCard(punchCardName)
        },
        [onAddPunchCard]
      ),
    },
    showPunchCardsButton: {
      isOpenPanel: isOpenPunchCardsPanel,
      items: punchCards,
      onDeletePunchCard,
      onSelectPunchCard,
      onDismiss: onDismissPunchCardPanel,
      disabled: React.useMemo(() => !punchCards.length, [punchCards.length]),
      onClick: onClickShowPunchCardsButton,
    },
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
  onEditPunchCard: PropTypes.func,
}

PunchCardApp.defaultProps = {
  punchCards: [],
  isOpenPunchCardsPanel: false,
}

export default React.memo(PunchCardApp)
