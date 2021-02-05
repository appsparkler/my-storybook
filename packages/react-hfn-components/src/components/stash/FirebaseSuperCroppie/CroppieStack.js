import React from 'react'
import PropTypes from 'prop-types'
import {
  Stack,
  DefaultButton,
  SpinnerSize,
  Spinner,
  ProgressIndicator,
} from 'office-ui-fabric-react'
import PreviewModal from '@react-hfn-components/PreviewModal'

const CroppieStack = ({
  isUploading,
  croppieRef,
  croppedDataURL,
  handleUploadButtonClick,
  progress,
}) => (
  <Stack.Item>
    <div style={{ width: '100vw', height: 'auto' }} ref={croppieRef}></div>
    {croppedDataURL && (
      <Stack horizontal horizontalAlign="center" tokens={{ childrenGap: 20 }}>
        <Stack tokens={{ childrenGap: 10 }}>
          <DefaultButton
            onClick={handleUploadButtonClick}
            disabled={isUploading}
            primary
            text="Upload Photo"
          />
          {isUploading && (
            <Stack.Item>
              <Spinner label="Uploading" size={SpinnerSize.large} />
              <ProgressIndicator percentComplete={progress / 100} />
            </Stack.Item>
          )}
        </Stack>
        <PreviewModal imgSrc={croppedDataURL} disabled={isUploading} />
      </Stack>
    )}
  </Stack.Item>
)

CroppieStack.propTypes = {
  isUploading: PropTypes.bool,
  croppieRef: PropTypes.shape({
    current: PropTypes.any,
  }),
  croppedDataURL: PropTypes.string,
  handleUploadButtonClick: PropTypes.func.isRequired,
  progress: PropTypes.number,
}

export default CroppieStack
