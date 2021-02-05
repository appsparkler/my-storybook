import React from 'react'
import CroppieInput from './CroppieInput'
import FileInput from './FileInput'
import PropTypes from 'prop-types'
import useFirebasePhotoInput from './useFirebasePhotoInput'
import CurrentPhoto from './CurrentPhoto'
import './styles.sass'

const FirebasePhotoInput = (props) => {
  const superProps = useFirebasePhotoInput({ props })
  const { selectedFile } = superProps
  return (
    <div className="ReactHFN_FirebasePhotoInput">
      <div className="CurrentPhotoAndFileInput col-xs-12 col-sm-5 col-lg-3">
        <CurrentPhoto {...superProps} />
        <FileInput {...superProps} />
      </div>
      <div className="row">
        <div className="col-xs-12">
          {selectedFile && <CroppieInput {...superProps} />}
        </div>
      </div>
      {/*
            <div className="state">
              <h2>No File Uploaded State</h2>
              <FileInput {...superProps} />
            </div>

            <div className="state">
              <h2>Exceeds MaxBytes</h2>
              {superProps?.exceedsMaxBytes && <p>Exceeds max Bytes...</p>}
            </div>

            <div className="state">
              <CurrentPhoto {...superProps} />
            </div>

            <div className="state">
              <h2>Croppie</h2>
              {selectedFile && <CroppieInput {...superProps}/>}
            </div>
      */}
    </div>
  )
}

FirebasePhotoInput.defaultProps = {
  onUpload: () => null,
  maxBytes: 3 * 1024 * 1024,
  croppieConfig: {
    viewport: { width: 200, height: 200 },
    boundary: { width: 300, height: 300 },
  },
}

FirebasePhotoInput.propTypes = {
  onUpload: PropTypes.func,
  croppieConfig: PropTypes.object,
  file: PropTypes.object,
  storageRef: PropTypes.object.isRequired,
}

export default FirebasePhotoInput
