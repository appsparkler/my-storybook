import React from 'react'
import PropTypes from 'prop-types'
import FirebaseFileLink from '@react-hfn-hoc/FirebaseFileLink'
import {Stack, ProgressIndicator} from 'office-ui-fabric-react'
import FileInputButton from '@react-hfn-hoc/FileInputButton'

const FirebaseFileInput = ({
  handleFileInputChange,
  isUploading,
  error,
  uploaded,
  progress,
  handleUploadButtonClick,
  isVerifying,
  firebaseFile,
  btnText,
}) => (
  <Stack horizontal wrap horizontalAlign="center" gap="10">
    <FirebaseFileLink
      isVerifying={isVerifying}
      isUploading={isUploading}
      file={firebaseFile}
    />
    <Stack.Item>
      <FileInputButton
        disabled={isVerifying || isUploading}
        primary={!!firebaseFile}
        secondary={!firebaseFile}
        onChange={handleFileInputChange}
        text={btnText}
      />
      {isUploading && <ProgressIndicator percentComplete={progress / 100} />}
    </Stack.Item>
  </Stack>
)

FirebaseFileInput.propTypes = {
  handleFileInputChange: PropTypes.func.isRequired,
  isUploading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  uploaded: PropTypes.bool.isRequired,
  progress: PropTypes.number,
  handleUploadButtonClick: PropTypes.func.isRequired,
  isVerifying: PropTypes.bool.isRequired,
  firebaseFile: PropTypes.object,
  btnText: PropTypes.string.isRequired,
}

export default FirebaseFileInput
