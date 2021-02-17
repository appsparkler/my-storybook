import React from 'react'
import useFileUploader from '../FileUploader/useFileUploader'
import useFirestoreCollection from '../FirestoreCollection/useFirestoreCollection'
import useFileRemover from '../FileRemover-V2/useFileRemover'
import useFileDownloader from '../FileDownloader/useFileDownloader'

const Story = {
  title: 'Hooks/File Manager/useFileManager',
}

export default Story

const useFileManager = ({ collectionPath, storagePath }) => {
  const { uploadFiles, isUploading } = useFileUploader({
    collectionPath,
    storagePath,
    onError: console.error,
  })
  const files = useFirestoreCollection(collectionPath)
  const { downloadFile, downloadingFileList } = useFileDownloader()

  const { removeFile, removingFileList } = useFileRemover({
    onError: (err) => console.log(err),
  })

  return {
    files,
    isUploading,
    uploadFiles,
    downloadFile,
    downloadingFileList,
    removeFile,
    removingFileList,
  }
}

const Template = ({ collectionPath, storagePath }) => {
  const {
    removeFile,
    removingFileList,
    uploadFiles,
    isUploading,
    downloadFile,
    downloadingFileList,
    files,
  } = useFileManager({ collectionPath, storagePath }) // The Hook

  // When user uploads a file with the file input
  const onChangeFileInput = React.useCallback(
    async (evt) => {
      const { files } = evt.target
      await uploadFiles(files)
    },
    [uploadFiles]
  )

  // When user click on CTA to download a single file
  const onClickDownloadFile = React.useCallback(
    async (evt) => {
      const { key: fileKey } = evt.target.dataset
      await downloadFile(files[fileKey].fullPath)
    },
    [downloadFile, files]
  )

  // When use clicks on CTA to delete the file
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
          {downloadingFileList.length &&
            `Downloading ${downloadingFileList.length} file(s)...`}
          {removingFileList.length ? 'Removing...' : null}
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
                      disabled={downloadingFileList.some(
                        (filePath) => filePath === file.fullPath
                      )}
                      onClick={onClickDownloadFile}
                    >
                      Download/Open
                    </button>
                    &nbsp;
                    <button
                      type="button"
                      data-key={key}
                      onClick={onClickDeleteFile}
                      disabled={removingFileList.some(
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

      <pre>{JSON.stringify({ removingFileList }, null, 2)}</pre>
      <pre>{JSON.stringify({ downloadingFileList }, null, 2)}</pre>
    </div>
  )
}

Template.args = {
  collectionPath: 'my-uploaded-files',
  storagePath: '',
}

export const Example = Template.bind({})
Example.args = {
  ...Template.args,
}
