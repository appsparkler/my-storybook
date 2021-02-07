import React from 'react'
import PropTypes from 'prop-types'

const HelpBlock = ({msg}) => <div className="help-block">{msg}</div>

HelpBlock.propTypes = {
  msg: PropTypes.string.isRequired,
}

export default HelpBlock
