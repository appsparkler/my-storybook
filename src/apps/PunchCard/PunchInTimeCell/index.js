import React from 'react';
import PropTypes from 'prop-types';
import {TooltipHost, MaskedTextField} from '@fluentui/react'

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
  const [state] = React.useState({
    tooltipHost0: {
      content: 'In YYYY-MM-DD HH:mm format'
    },
    maskedTextField0: {
      mask: '9999-99-99 99:99'
    }
  });

  const punchInTimeCellLayout = {
    tooltipHost0: {
      ...state.tooltipHost0,
    },
    maskedTextField0: {
      ...state.maskedTextField0,
      value, onChange
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
