import React from 'react'
import HelpBlock from '@app/legacy/HelpBlock'
import BSAlert from '@app/legacy/BSAlert'
import BSProgress from '@app/legacy/BSProgress'
import FirebaseFileLink from '@app/legacy/FirebaseFileLink'
import PropTypes from 'prop-types'
import useFileInput from './useFileInput'
import useFileLink from '@app/legacy/FirebaseFileLink/useFileLink'

const FileInput = (props) => {
  const {
    components,
    type,
    name,
    label,
    maxBytes,
    maxBytesError,
    progress,
    handleInput,
    maxBytesExceeded,
    isUploading,
    file,
    disabled,
    required,
    uploaded,
    isVerifying,
  } = useFileInput(props)
  useFileLink(props)
  return (
    <>
      {components?.fileInput && (
        <>
          <components.fileInput
            type={type}
            name={name}
            label={label}
            maxBytes={maxBytes}
            maxBytesError={maxBytesError}
            progress={progress}
            handleInput={handleInput}
            maxBytesExceeded={maxBytesExceeded}
            isUploading={isUploading}
            uploaded={uploaded}
            isVerifying={isVerifying}
            file={file}
            required={required}
          />
        </>
      )}

      {!components?.fileInput && (
        <div className="form-group">
          <FirebaseFileLink {...props} />
          <br />
          <label>{label}</label>
          <input
            type={type}
            name={name}
            onInput={handleInput}
            disabled={disabled}
            required={required}
          />
          <br />
          {isUploading && !uploaded && (
            <BSProgress type="info" striped={true} progress={progress} />
          )}
          {uploaded && <BSAlert type="info" msg="Uploaded..." />}
          <HelpBlock msg={`${maxBytes.toFixed()} kB`} />
          {maxBytesExceeded && (
            <BSAlert type="danger" msg={`${maxBytesError}`} />
          )}
        </div>
      )}
    </>
  )
}

FileInput.propTypes = {
  components: PropTypes.object,

  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,

  maxBytes: PropTypes.number,
  maxBytesError: PropTypes.string,

  file: PropTypes.object,
  setFile: PropTypes.func,

  storageRef: PropTypes.object.isRequired,
}

FileInput.defaultProps = {
  maxBytes: 1 * 1024 * 1024, // 1MB
  name: 'file',
  type: 'file',
  disabled: false,
  required: false,
}

export default FileInput
