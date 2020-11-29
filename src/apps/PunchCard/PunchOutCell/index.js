import React from 'react'
import PropTypes from 'prop-types'
import {
  MaskedTextField, PrimaryButton,
  Stack,
  TooltipHost, mergeStyleSets
} from '@fluentui/react'
import moment from 'moment'
import {FORMAT, selectTimeInDate} from '../shared'

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

const PunchOutTimeCell = ({
  value, onClick, onChange,
  errorMessage
}) => {

  const [state, setState] = React.useState({
    tooltipHost: {
      content: `In ${FORMAT} format`
    },
    maskedTextField0: {
      mask: '9999-99-99 99:99'
    },
    primaryButton0: {
      text: 'Punch Out',
      iconProps: {
        className: classNames.primaryButton0Icon,
        iconName: 'Leave'
      },
    }
  });

  const updateMaskedTextField0 = React.useCallback((update) => {
    setState(currentState => ({
      ...currentState,
      maskedTextField0: {
        ...currentState.maskedTextField0,
        ...update
      }
    }))
  },[]);

  const punchOutTimeCell = {
    showTextField: Boolean(value),
    tooltipHost: {
      ...state.tooltipHost
    },
    maskedTextField0: {
      ...state.maskedTextField0,
      value,
      onClick: React.useCallback((evt) => {
        selectTimeInDate(evt.target)
      },[]),
      onChange: React.useCallback((evt, value) => {
        const isMasked = Boolean(String(value).match(/_/));
        if(!isMasked) {
          const isValid = moment(value, FORMAT).isValid();
          if(isValid) {
            updateMaskedTextField0({
              value,
              errorMessage: ''
            })
            onChange(value);
          } else {
            updateMaskedTextField0({
              errorMessage: 'invalid date/time'
            })
          };
        }
      },[onChange, updateMaskedTextField0])
    },
    primaryButton0: {
      ...state.primaryButton0,
      onClick
    }
  }

  React.useEffect(() => {
    updateMaskedTextField0({
      errorMessage
    })
  },[errorMessage, updateMaskedTextField0])

  return <PunchOutTimeCellLayout {...punchOutTimeCell} />
}

PunchOutTimeCell.propTypes = {
  value: PropTypes.string,
  errorMessage: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func
}

export default React.memo(PunchOutTimeCell)
