import React from 'react'
import useUploadButton from './useUploadButton'

const UploadButton = (props) => {
  const { uploadPhoto } = useUploadButton({ props })
  return (
    <div className="UploadButton">
      <button
        className="btn btn-primary btn-lg btn-block"
        onClick={uploadPhoto}
      >
        Upload Photo
      </button>
    </div>
  )
}

export default UploadButton
