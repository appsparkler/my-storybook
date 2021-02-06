import React from 'react'
// import PropTypes from 'prop-types'
import { map } from 'lodash'
import { useSelector } from 'react-redux'
import { useFirebase, useFirestoreConnect } from 'react-redux-firebase'
import Dropzone from 'react-dropzone'

const filesPath = 'uploadedFiles'

const Uploader = () => {
  useFirestoreConnect(() => [{ collection: filesPath }])
  const firebase = useFirebase()
  const state = useSelector((state) => state)
  const uploadedFiles = useSelector(
    ({ firestore: { data } }) => data[filesPath]
  )
  const onFilesDrop = React.useCallback(
    (files) => {
      try {
        firebase
          .uploadFiles(filesPath, files, filesPath)
          .then((res) => {
            console.log({ res, uploadedFiles, state })
          })
          .catch(console.error)
          .finally(console.log)
      } catch (e) {
        console.log({ e })
      } finally {
        console.log('DONE')
      }
    },
    [firebase, uploadedFiles, state]
  )
  const onFileDelete = React.useCallback(
    (file, key) => {
      return firebase.deleteFile(file.fullPath, `${filesPath}/${key}`)
    },
    [firebase]
  )
  console.log({ uploadedFiles })
  return (
    <div>
      <pre>{JSON.stringify({ uploadedFiles }, null, 2)}</pre>
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
