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
            onChange(value);
          } else {
            onError('invalid date/time');
          };
        }
      },[onChange, onError]),
    }
  }

  return (
    <PunchInTimeCellLayout  {...punchInTimeCellLayout} />
  )
}

PunchInTimeCell.propTypes = {
  /** The value we want the component to display. */
  value: PropTypes.string,
  /** The error message we want the component to display*/
  errorMessage: PropTypes.string,
  /** The callback when a valid-date is entered by the user input. */
  onChange: PropTypes.func,
  /** This callback is triggerred when the user enters an invalid-date. */
  onError: PropTypes.func,
}

export default React.memo(PunchInTimeCell);
