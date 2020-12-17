import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css'

const Progress = ({
  punchedPercent, scheduledPercent
}) => (
  <div className="progress">
    <div
      className="progress-bar bg-success"
      role="progressbar"
      style={{width: `${punchedPercent}%`}}
      aria-valuenow={punchedPercent}
      aria-valuemin="0"
      aria-valuemax="100"
    >Punched Slots</div>
    <div
      className="progress-bar bg-warning progress-bar-striped"
      role="progressbar"
      style={{width: `${scheduledPercent}%`}}
      aria-valuenow={scheduledPercent}
      aria-valuemin="0"
      aria-valuemax="100"
    >Scheduled Slots</div>
  </div>

);

Progress.propTypes = {
  punchedPercent: PropTypes.number,
  scheduledPercent: PropTypes.number
};

export default React.memo(Progress);
