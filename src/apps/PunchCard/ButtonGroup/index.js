import React from 'react'
import PropTypes from 'prop-types'
import {
  Stack, PrimaryButton, DefaultButton,
  IconButton
} from '@fluentui/react';

const ButtonGroupLayout = ({
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

export const ButtonGroup = ({
  onClickPunchIn, onClickAddScheduledSlot,
  punchInText,
  showIcon, punchInDisabled
}) => {
  const buttonGroup = {
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
    <ButtonGroupLayout {...buttonGroup} />
  )
}

ButtonGroup.propTypes = {
  showIcon: PropTypes.bool,
  punchInText: PropTypes.string,
  onClickAddScheduledSlot: PropTypes.func,
  onClickPunchIn: PropTypes.func
}

export default React.memo(ButtonGroup)
