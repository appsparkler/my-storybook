import React from 'react'
import {
  MaskedTextField, PrimaryButton,
  Stack,
  TooltipHost, mergeStyleSets
} from '@fluentui/react'

const PunchOutTimeCellLayout = ({
  showTextField, tooltipHost,
  maskedTextField0, primaryButton0
}) => showTextField ? (
  <TooltipHost {...tooltipHost}>
    <MaskedTextField {...maskedTextField0}/>
  </TooltipHost>
) : (
  <Stack>
    <PrimaryButton {...primaryButton0} />
  </Stack>
)

const classNames = mergeStyleSets({
  primaryButton0Icon: {
    transform: 'rotate(180deg)'
  }
})

export const PunchOutTimeCell = () => {
  const [state] = React.useState({
    showTextField: false,
    tooltipHost: {} ,
    maskedTextField0: {
    },
    primaryButton0: {
      text: 'Punch Out',
      iconProps: {
        className: classNames.primaryButton0Icon,
        iconName: 'Leave'
      },
    }
  });

  const punchOutTimeCell = {
    showTextField: state.showTextField,
    tooltipHost: {
      ...state.tooltipHost
    },
    maskedTextField0: {
      ...state.maskedTextField0
    },
    primaryButton0: {
      ...state.primaryButton0
    }
  }

  return <PunchOutTimeCellLayout {...punchOutTimeCell} />
}

export default React.memo(PunchOutTimeCell)
