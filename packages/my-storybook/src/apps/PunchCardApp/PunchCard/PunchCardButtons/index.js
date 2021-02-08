import React from 'react'
import PropTypes from 'prop-types'
import { Stack, PrimaryButton } from '@appsparkler/fluentui-react'
import AddScheduledSlotButton from './AddScheduledSlotButton'

const PunchCardButtonsLayout = ({ primaryButton, addScheduledSlotButton }) => (
  <Stack horizontal tokens={{ childrenGap: 10 }}>
    <PrimaryButton {...primaryButton} />
    <AddScheduledSlotButton {...addScheduledSlotButton} />
  </Stack>
)

const PunchCardButtons = ({
  onClickPunchIn,
  onAddScheduledSlot,
  punchInText,
  showIcon,
  punchInDisabled,
}) => {
  const punchCardButtons = {
    primaryButton: {
      text: punchInText,
      iconProps: React.useMemo(
        () =>
          showIcon && {
            iconName: 'Leave',
          },
        [showIcon]
      ),
      disabled: punchInDisabled,
      onClick: onClickPunchIn,
    },
    addScheduledSlotButton: {
      onAddScheduledSlot: onAddScheduledSlot,
    },
  }

  return <PunchCardButtonsLayout {...punchCardButtons} />
}

PunchCardButtons.propTypes = {
  showIcon: PropTypes.bool,
  punchInText: PropTypes.string,
  onAddScheduledSlot: PropTypes.func,
  onClickPunchIn: PropTypes.func,
}

export default React.memo(PunchCardButtons)
