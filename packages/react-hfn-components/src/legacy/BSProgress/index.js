import React from 'react'
import PropTypes from 'prop-types'

const BSProgress = ({progress, striped, type}) => (
  <div className={`progress ${striped && 'progress-striped'}`}>
    <div
      className={`progress-bar ${type && 'progress-bar-' + type}`}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin="0"
      aria-valuemax="100"
      style={{width: `${progress}%`}}
    >
      <span className="sr-only">{progress}% Complete</span>
    </div>
  </div>
)

BSProgress.propTypes = {
  progress: PropTypes.number.isRequired,
  striped: PropTypes.bool,
  type: PropTypes.string,
}

export default BSProgress
