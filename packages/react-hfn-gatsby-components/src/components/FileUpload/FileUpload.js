import React from 'react'
import PropTypes from 'prop-types'
import { map } from 'lodash'
import Dropzone from 'react-dropzone'
import useFileUpload from './useFileUpload'
import useFileDownloader from './useFileDownloader'

const Uploader = ({ path }) => {
  const {
    uploadedFiles,
    uploadFiles,
    onFileDelete,
    isDeleting,
    isUploading,
  } = useFileUpload({ path })
  const { downloadFile, isDownloading } = useFileDownloader({
    onError: (err) => console.error(err),
  })
  const onClickDownloadFile = React.useCallback(
    async (evt) => {
      const { filePath } = evt.target.dataset
      if (!filePath) {
        console.error(
          'Please add data-file-path attribute to the click-element'
        )
        return
      }
      downloadFile(filePath)
    },
    [downloadFile]
  )
  return (
    <div>
      <pre>{JSON.stringify({ uploadedFiles }, null, 2)}</pre>
      {isUploading && 'Uploading...'}
      {isDeleting && 'Deleting...'}
      {isDownloading && 'Downloading...'}
      <Dropzone onDrop={uploadFiles}>
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
              &nbsp;
              <button
                data-file-path={file.fullPath}
                onClick={onClickDownloadFile}
              >
                Open/Download File
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
