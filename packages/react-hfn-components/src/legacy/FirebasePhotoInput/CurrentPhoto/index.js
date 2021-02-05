import React from 'react'
import PropTypes from 'prop-types'
import useCurrentPhoto from './useCurrentPhoto'

const CurrentPhoto = (props) => {
  useCurrentPhoto({ props })
  return (
    <div className="CurrentPhoto">
      {props.downloadURL && (
        <>
          <h5 className="text-muted">Current Photo: </h5>
          <img
            className="img-thumbnail"
            height="100"
            width="113"
            src={props.downloadURL}
          />
        </>
      )}
      {!props.downloadURL && (
        <div className="alert alert-warning">
          <strong>No Pic Uploaded...</strong>
        </div>
      )}
    </div>
  )
}

CurrentPhoto.propTypes = {
  storageRef: PropTypes.object,
  downloadURL: PropTypes.string,
}

export default CurrentPhoto
