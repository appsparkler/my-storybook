import React from 'react';
import PropTypes from 'prop-types';
import {
  TooltipHost, MaskedTextField
} from '@fluentui/react'
import moment from 'moment'
import {FORMAT, selectTimeInDate} from '../shared'

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
  value, errorMessage,
  onChange, onError
}) => {
  const [state] = React.useState({
    tooltipHost0: {
      content: `In ${FORMAT} format`
    },
    maskedTextField0: {
      mask: '9999-99-99 99:99'
    }
  });

  // const updateMaskedTextField0 = React.useCallback((update) => {
  //   setState(currentState => ({
  //     ...currentState,
  //     maskedTextField0: {
  //       ...currentState.maskedTextField0,
  //       ...update
  //     }
  //   }))
  // },[])

  const punchInTimeCellLayout = {
    tooltipHost0: {
      ...state.tooltipHost0,
    },
    maskedTextField0: {
      value, errorMessage,
      ...state.maskedTextField0,
      onClick: React.useCallback((evt) => {
        const elem = evt.target;
        selectTimeInDate(elem)
      },[]),
      onChange: React.useCallback((evt, value) => {
        const isMasked = Boolean(String(value).match(/_/));
        if(!isMasked) {
          const isValid = moment(value, FORMAT).isValid();
          if(isValid) {
            // updateMaskedTextField0({
            //   value,
            // })
            // onError(value);
            onChange(value);
          } else {
            // updateMaskedTextField0({
            //   errorMessage: 'invalid date/time'
            // })
            onError('invalid date/time');
          };
        }
      },[onChange, onError]),
    }
  }

  // React.useEffect(() => {
  //   updateMaskedTextField0({
  //     errorMessage
  //   })
  // },[errorMessage, updateMaskedTextField0])

  return (
    <PunchInTimeCellLayout  {...punchInTimeCellLayout} />
  )
}

PunchInTimeCell.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onError: PropTypes.func,
  errorMessage: PropTypes.string
}

export default React.memo(PunchInTimeCell);
