import React from 'react'
import PropTypes from 'prop-types'

const PreviewImage = (props) => {
  return (
    <div className="PreviewImage col-xs-4">
      <h3 className="text-center text-muted">Preview</h3>
      <img className="center-block" src="" ref={props?.photoPreviewRef} />
    </div>
  )
}

PreviewImage.propTypes = {
  photoPreviewRef: PropTypes.shape({
    current: PropTypes.any,
  }),
}

export default PreviewImage
