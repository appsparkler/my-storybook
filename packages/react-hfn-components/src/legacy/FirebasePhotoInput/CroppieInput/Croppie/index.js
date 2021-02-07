import React from 'react'
import PropTypes from 'prop-types'

const Croppie = (props) => {
  const {croppieRef} = props

  return (
    <div className="Croppie col-xs-8">
      <h3 className="text-center text-muted">Crop photo</h3>
      <div ref={croppieRef} className="the-croppie"></div>
    </div>
  )
}
Croppie.propTypes = {
  croppieRef: PropTypes.object.isRequired,
}

export default Croppie
