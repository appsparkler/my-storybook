import React from 'react'
import PropTypes from 'prop-types'
import {
  MaskedTextField,
  PrimaryButton,
  Stack,
  TooltipHost,
  mergeStyleSets,
} from '@appsparkler/fluentui-react'
import moment from 'moment'
import { FORMAT, selectTimeInDate } from '../../shared'

const PunchOutTimeCellLayout = ({
  showTextField,
  tooltipHost,
  maskedTextField0,
  primaryButton0,
}) =>
  showTextField ? (
    <TooltipHost {...tooltipHost}>
      <MaskedTextField {...maskedTextField0} />
    </TooltipHost>
  ) : (
    <Stack>
      <PrimaryButton {...primaryButton0} />
    </Stack>
  )

const classNames = mergeStyleSets({
  primaryButton0Icon: {
    transform: 'rotate(180deg)',
  },
})

const PunchOutTimeCell = ({
  value,
  onClick,
  onChange,
  onError,
  errorMessage,
}) => {
  const [state] = React.useState({
    tooltipHost: {
      content: `In ${FORMAT} format`,
    },
    maskedTextField0: {
      mask: '9999-99-99 99:99',
    },
    primaryButton0: {
      text: 'Punch Out',
      iconProps: {
        className: classNames.primaryButton0Icon,
        iconName: 'Leave',
      },
    },
  })

  const punchOutTimeCell = {
    showTextField: Boolean(value),
    tooltipHost: {
      ...state.tooltipHost,
    },
    maskedTextField0: {
      ...state.maskedTextField0,
      value,
      errorMessage,
      onClick: React.useCallback((evt) => {
        selectTimeInDate(evt.target)
      }, []),
      onChange: React.useCallback(
        (evt, value) => {
          const isMasked = Boolean(String(value).match(/_/))
          if (!isMasked) {
            const isValid = moment(value, FORMAT).isValid()
            isValid ? onChange(value) : onError('invalid date/time')
          }
        },
        [onChange, onError]
      ),
    },
    primaryButton0: {
      ...state.primaryButton0,
      onClick,
    },
  }

  return <PunchOutTimeCellLayout {...punchOutTimeCell} />
}

PunchOutTimeCell.propTypes = {
  value: PropTypes.string,
  errorMessage: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  onError: PropTypes.func,
}

export default React.memo(PunchOutTimeCell)
