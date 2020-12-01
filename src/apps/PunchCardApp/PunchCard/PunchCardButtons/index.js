import React from 'react'
import PropTypes from 'prop-types'
import {
  Stack, PrimaryButton, DefaultButton,
  IconButton
} from '@fluentui/react';

const PunchCardButtonsLayout = ({
  primaryButton, defaultButton,
  iconButton
}) => (

  <Stack horizontal
    tokens={{childrenGap: 10}}
  >
    <PrimaryButton
      {...primaryButton}
    />
    <DefaultButton
      {...defaultButton}
    />
    <IconButton {...iconButton}/>
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
    defaultButton: {
      className: 'ms-hiddenSm',
      text: 'Add Scheduled Slot',
      iconProps: {
        iconName: 'Add'
      },
      onClick: onClickAddScheduledSlot
    },
    iconButton: {
      className: 'ms-hiddenMdUp',
      iconProps: {
        iconName: 'Add'
      },
      onClick: onClickAddScheduledSlot
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
