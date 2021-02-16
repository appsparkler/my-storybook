import React from 'react'
// import FileManager from '.'
import useFileUploader from '../FileUploader/useFileUploader'
import useFirestoreCollection from '../FirestoreCollection/useFirestoreCollection'
import useFileDownloader from '../FileDownloader/useFileDownloader'
import { useFirebase } from 'react-redux-firebase'

const FileManager = ({ collectionPath, storagePath }) => {
  const { uploadFiles, isUploading } = useFileUploader({
    collectionPath,
    storagePath,
    onError: console.error,
  })
  const files = useFirestoreCollection(collectionPath)
  const { downloadFile, isDownloading } = useFileDownloader()
  const onChangeFileInput = React.useCallback(
    async (evt) => {
      const { files } = evt.target
      await uploadFiles(files)
    },
    [uploadFiles]
  )
  const onClickDownloadFile = React.useCallback(
    async (evt) => {
      const { key: fileKey } = evt.target.dataset
      await downloadFile(files[fileKey].fullPath)
    },
    [downloadFile, files]
  )
  const firebase = useFirebase()
  const onClickDeleteFile = React.useCallback(
    async (evt) => {
      const { key: fileKey } = evt.target.dataset
      await firebase.deleteFile(
        files[fileKey].fullPath,
        `${collectionPath}/${fileKey}`
      )
    },
    [firebase, files, collectionPath]
  )
  return (
    <div>
      <label>
        Upload Files
        <br />
        <input type="file" multiple onChange={onChangeFileInput} />
      </label>
      {
        <pre
          style={{
            position: 'fixed',
            padding: 10,
            right: 0,
            top: 0,
            background: 'black',
            color: 'yellow',
          }}
        >
          {isUploading && 'Uploading...'}
          {isDownloading && 'Downloading...'}
        </pre>
      }
      <table>
        <thead>
          <tr>
            <th>Sr #</th>
            <th>File Name</th>
            <th>CTAs</th>
          </tr>
        </thead>
        <tbody>
          {files &&
            Object.entries(files).map(([key, file]) =>
              file ? (
                <tr key={key}>
                  <td>1</td>
                  <td>{file.name}</td>
                  <td>
                    <button
                      type="button"
                      data-key={key}
                      onClick={onClickDownloadFile}
                    >
                      Download/Open
                    </button>
                    &nbsp;
                    <button
                      type="button"
                      data-key={key}
                      onClick={onClickDeleteFile}
                    >
                      Delete File
                    </button>
                  </td>
                </tr>
              ) : null
            )}
        </tbody>
      </table>
    </div>
  )
}

const Story = {
  title: 'Components/File Manager',
  component: FileManager,
}

export default Story

const Template = (args) => <FileManager {...args} />
Template.args = {
  collectionPath: 'my-uploaded-files',
  storagePath: '',
}

export const Example = Template.bind({})
Example.args = {
  ...Template.args,
}
