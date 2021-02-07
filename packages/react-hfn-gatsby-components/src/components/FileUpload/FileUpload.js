import React from 'react'
import PropTypes from 'prop-types'
import { map } from 'lodash'
import Dropzone from 'react-dropzone'
import useFileUpload from './useFileUpload'

const Uploader = ({ path }) => {
  const {
    uploadedFiles,
    onFilesDrop,
    onFileDelete,
    isDeleting,
    isUploading,
  } = useFileUpload({ path })
  return (
    <div>
      <pre>{JSON.stringify({ uploadedFiles }, null, 2)}</pre>
      {isUploading && 'Uploading...'}
      {isDeleting && 'Deleting...'}
      <Dropzone onDrop={onFilesDrop}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>
      {uploadedFiles && (
        <div>
          <h3>Uploaded file(s):</h3>
          {map(uploadedFiles, (file, key) => (
            <div key={file.name + key}>
              <span>{file.name}</span>
              <button onClick={() => onFileDelete(file, key)}>
                Delete File
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

Uploader.propTypes = {
  path: PropTypes.string,
}

export default React.memo(Uploader)
