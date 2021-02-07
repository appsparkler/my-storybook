import React from 'react'
import PropTypes from 'prop-types'
import {Stack} from 'office-ui-fabric-react'
import FileInputButton from '@react-hfn-hoc/FileInputButton'

const FileInput = ({
  file,
  fileInputRef,
  handleFileInputChange,
  isUploading,
  isVerifying,
  imgIsLoading,
  accept,
  text,
}) => (
  <Stack.Item>
    <div style={{width: '100vw'}}>
      <Stack horizontalAlign="center">
        <Stack.Item>
          <FileInputButton
            primary={!!file}
            secondary={!file}
            disabled={isUploading || isVerifying || imgIsLoading}
            onChange={handleFileInputChange}
            text={text}
            fileInputRef={fileInputRef}
            accept={accept}
          />
        </Stack.Item>
      </Stack>
    </div>
  </Stack.Item>
)

FileInput.propTypes = {
  file: PropTypes.object,
  fileInputRef: PropTypes.shape({
    current: PropTypes.any,
  }),
  handleFileInputChange: PropTypes.func.isRequired,
  isUploading: PropTypes.bool.isRequired,
  isVerifying: PropTypes.bool.isRequired,
  imgIsLoading: PropTypes.bool.isRequired,
  accept: PropTypes.string,
  text: PropTypes.string.isRequired,
}

export default FileInput
