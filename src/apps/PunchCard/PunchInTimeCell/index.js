import React from 'react';
import PropTypes from 'prop-types';
import {
  TooltipHost, MaskedTextField
} from '@fluentui/react'
import moment from 'moment'

const FORMAT = 'YYYY-MM-DD HH:mm'

const PunchInTimeCellLayout = ({
  tooltipHost0, maskedTextField0,
}) => (
  <TooltipHost {...tooltipHost0}>
    <MaskedTextField
      {...maskedTextField0}
    />
  </TooltipHost>
);

const PunchInTimeCell = ({
  value, onChange
}) => {
  const [state, setState] = React.useState({
    tooltipHost0: {
      content: `In ${FORMAT} format`
    },
    maskedTextField0: {
      mask: '9999-99-99 99:99'
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
  },[])

  const punchInTimeCellLayout = {
    tooltipHost0: {
      ...state.tooltipHost0,
    },
    maskedTextField0: {
      ...state.maskedTextField0,
      onClick: React.useCallback((evt) => {
        const elem = evt.target;
        elem.selectionStart = 11;
        elem.selectionEnd = 16;
      },[]),
      value,
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
    }
  }

  return (
    <PunchInTimeCellLayout  {...punchInTimeCellLayout} />
  )
}

PunchInTimeCell.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
}

export default React.memo(PunchInTimeCell);
