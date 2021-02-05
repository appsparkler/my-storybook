import React from 'react'
// import PropTypes from 'prop-types'
import { map } from 'lodash'
import { useSelector } from 'react-redux'
import { useFirebase } from 'react-redux-firebase'
import Dropzone from 'react-dropzone'

const filesPath = 'uploadedFiles'

const Uploader = () => {
  const firebase = useFirebase()
  const uploadedFiles = useSelector(({ firebase: { data } }) => data[filesPath])
  const onFilesDrop = React.useCallback(
    async (files) => {
      try {
        const res = await firebase.uploadFiles(filesPath, files, filesPath)
        alert(JSON.stringify({ res }, null, 2))
      } catch (e) {
        console.log({ e })
      } finally {
        console.log('DONE')
      }
    },
    [firebase]
  )
  const onFileDelete = React.useCallback(
    (file, key) => {
      return firebase.deleteFile(file.fullPath, `${filesPath}/${key}`)
    },
    [firebase]
  )

  return (
    <div>
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

export default React.memo(Uploader)
