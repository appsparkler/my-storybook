import React from 'react'
import PropTypes from 'prop-types'
import {
  Stack, PrimaryButton
} from '@fluentui/react';
import AddScheduledSlotButton from '../AddScheduledSlotPanel/AddScheduledSlotButton'

const PunchCardButtonsLayout = ({
  primaryButton, addScheduledSlotButton
}) => (

  <Stack horizontal
    tokens={{childrenGap: 10}}
  >
    <PrimaryButton
      {...primaryButton}
    />
    <AddScheduledSlotButton {...addScheduledSlotButton} />
  </Stack>

);

const PunchCardButtons = ({
  onClickPunchIn, onClickAddScheduledSlot,
  punchInText,
  showIcon, punchInDisabled
}) => {
  const punchCardButtons = {
    primaryButton: {
      text: punchInText,
      iconProps: React.useMemo(
        () => showIcon && ({
          iconName: 'Leave'
        }),
        [showIcon]
      ),
      disabled: punchInDisabled,
      onClick: onClickPunchIn
    },
    addScheduledSlotButton: {
      onAddScheduledSlot: onClickAddScheduledSlot
    }
  };

  return (
    <PunchCardButtonsLayout {...punchCardButtons} />
  )
}

PunchCardButtons.propTypes = {
  showIcon: PropTypes.bool,
  punchInText: PropTypes.string,
  onClickAddScheduledSlot: PropTypes.func,
  onClickPunchIn: PropTypes.func
}

export default React.memo(PunchCardButtons)
