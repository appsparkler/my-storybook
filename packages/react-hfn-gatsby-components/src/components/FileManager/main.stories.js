import React from 'react'
// import FileManager from '.'
import useFileUploader from '../FileUploader/useFileUploader'
import useFirestoreCollection from '../FirestoreCollection/useFirestoreCollection'
import useFileRemover from '../FileRemover/useFileRemover'
import useFileDownloader from '../FileDownloader/useFileDownloader'

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
  const { removeFile, removingFiles } = useFileRemover({
    onError: (err) => console.log(err),
  })
  const onClickDeleteFile = React.useCallback(
    async (evt) => {
      const { key: fileKey } = evt.target.dataset
      await removeFile({
        filePath: files[fileKey].fullPath,
        docPath: `${collectionPath}/${fileKey}`,
      })
    },
    [files, removeFile, collectionPath]
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
          {removingFiles.length ? 'Removing...' : null}
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
            Object.entries(files).map(([key, file], idx) =>
              file ? (
                <tr key={key}>
                  <td>{idx + 1}</td>
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
                      disabled={removingFiles.some(
                        (rFile) => rFile.filePath === file.fullPath
                      )}
                    >
                      Delete File
                    </button>
                  </td>
                </tr>
              ) : null
            )}
        </tbody>
      </table>

      <pre>{JSON.stringify({ removingFiles }, null, 2)}</pre>
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
