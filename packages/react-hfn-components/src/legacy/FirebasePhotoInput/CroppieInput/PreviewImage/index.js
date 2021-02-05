import React from 'react'

const PreviewImage = (props) => {
  return (
    <div className="PreviewImage col-xs-4">
      <h3 className="text-center text-muted">Preview</h3>
      <img className="center-block" src="" ref={props?.photoPreviewRef} />
    </div>
  )
}

export default PreviewImage
