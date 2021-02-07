import React from 'react'
import PropTypes from 'prop-types'

const BSAlert = ({type, msg}) => (
  <div className={`alert alert-${type}`}>{msg}</div>
)

BSAlert.defaultProps = {
  type: 'primary',
}

BSAlert.propTypes = {
  type: PropTypes.string,
  msg: PropTypes.string.isRequired,
}

export default BSAlert
