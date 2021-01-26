import React from 'react'
import PropTypes from 'prop-types'

const ShowHide = ({ show, children }) => show && children

ShowHide.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.any,
}

ShowHide.defaultProps = {
  show: true,
  children: null,
}

export default React.memo(ShowHide)
