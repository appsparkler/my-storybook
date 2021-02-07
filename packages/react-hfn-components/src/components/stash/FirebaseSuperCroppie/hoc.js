import React from 'react'
import PropTypes from 'prop-types'
import MediaSourceForm from './MediaSourceForm'
import CroppieStack from './CroppieStack'
import ProfilePhoto from './ProfilePhoto'
import FileInput from './FileInput'
import WebcamVideo from './WebcamVideo'
import {
  Stack,
  // Image,
  // ProgressIndicator,
  // DefaultButton,
  // Spinner, SpinnerSize,
  // MessageBar,
} from 'office-ui-fabric-react'

const FirebaseSuperCroppie = ({
  file,
  isVerifying,
  mediaSource,
  handleMediaSourceChange,
  handleFileInputChange,
  dataURL,
  croppieRef,
  croppedDataURL,
  handleUploadButtonClick,
  isUploading,
  progress,
  uploaded,
  webcamRef,
  clickPhoto,
  imgIsLoading,
  handleLoad,
  isWebcamAvailable,
  fileInputRef,
  isMobileDevice,
}) => (
  <Stack horizontalAlign="center" horizontal gap="20" wrap>
    <ProfilePhoto
      imgIsLoading={imgIsLoading}
      isVerifying={isVerifying}
      onLoad={handleLoad}
      file={file}
    />
    <MediaSourceForm
      disabled={isVerifying || isUploading}
      mediaSource={mediaSource}
      handleMediaSourceChange={handleMediaSourceChange}
    />
    {mediaSource === 'webcam' && !isMobileDevice && (
      <WebcamVideo onClick={clickPhoto} webcamRef={webcamRef} />
    )}
    {mediaSource === 'webcam' && isMobileDevice && (
      <FileInput
        file={file}
        fileInputRef={fileInputRef}
        handleFileInputChange={handleFileInputChange}
        isUploading={isUploading}
        isVerifying={isVerifying}
        imgIsLoading={imgIsLoading}
        accept="image/*;capture=camera"
        text="Use Webcam"
      />
    )}
    {mediaSource === 'file' && (
      <FileInput
        file={file}
        fileInputRef={fileInputRef}
        handleFileInputChange={handleFileInputChange}
        isUploading={isUploading}
        isVerifying={isVerifying}
        imgIsLoading={imgIsLoading}
        text={file ? 'Edit Photo' : 'Select Photo'}
      />
    )}
    {mediaSource && (
      <CroppieStack
        isUploading={isUploading}
        croppieRef={croppieRef}
        croppedDataURL={croppedDataURL}
        handleUploadButtonClick={handleUploadButtonClick}
        progress={progress}
      />
    )}
  </Stack>
)

FirebaseSuperCroppie.propTypes = {
  isWebcamAvailable: PropTypes.bool.isRequired,
  file: PropTypes.object,
  isVerifying: PropTypes.bool.isRequired,

  mediaSource: PropTypes.string,
  handleMediaSourceChange: PropTypes.func.isRequired,

  handleFileInputChange: PropTypes.func.isRequired,
  dataURL: PropTypes.string,

  webcamRef: PropTypes.any.isRequired,
  clickPhoto: PropTypes.func.isRequired,

  croppieRef: PropTypes.shape({current: PropTypes.instanceOf(Element)}),
  croppedDataURL: PropTypes.string,

  handleUploadButtonClick: PropTypes.func.isRequired,
  isUploading: PropTypes.bool.isRequired,
  progress: PropTypes.number.isRequired,
  uploaded: PropTypes.bool.isRequired,

  imgIsLoading: PropTypes.bool.isRequired,
  handleLoad: PropTypes.func.isRequired,
  fileInputRef: PropTypes.shape({
    current: PropTypes.any,
  }),

  isMobileDevice: PropTypes.bool,
}

export default FirebaseSuperCroppie
