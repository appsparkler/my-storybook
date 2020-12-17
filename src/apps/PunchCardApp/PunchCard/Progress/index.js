import React from 'react';
import PropTypes from 'prop-types';
import {Text, Stack} from '@fluentui/react'
import 'bootstrap/dist/css/bootstrap.css'

const Progress = ({
  show, punchedPercent, scheduledPercent, label
}) => show && (
  <Stack tokens={{childrenGap: 10}}>
    <Text variant="mediumPlus">
      📊Progress
    </Text>
    <div className="progress rounded-0" style={{height: 15}}>
      <div
        className="progress-bar"
        role="progressbar"
        style={{width: `${punchedPercent}%`}}
        aria-valuenow={punchedPercent}
        aria-valuemin="0"
        aria-valuemax="100"
      />
      <div
        className="progress-bar bg-warning progress-bar-striped"
        role="progressbar"
        style={{width: `${scheduledPercent}%`}}
        aria-valuenow={scheduledPercent}
        aria-valuemin="0"
        aria-valuemax="100"
      />
    </div>
  </Stack>

);

Progress.propTypes = {
  punchedPercent: PropTypes.number,
  scheduledPercent: PropTypes.number,
  show: PropTypes.bool
};

export default React.memo(Progress);
