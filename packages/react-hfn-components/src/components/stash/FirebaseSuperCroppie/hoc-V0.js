import React from 'react'
import PropTypes from 'prop-types'
import MediaSourceForm from './MediaSourceForm'
import UploadButton from './UploadButton'
import FileInputButton from '@react-hfn-hoc/FileInputButton'
import PreviewModal from '@react-hfn-components/PreviewModal'
import {
  ProgressIndicator,
  DefaultButton,
  Spinner,
  SpinnerSize,
  Image,
  ImageFit,
  MessageBar,
  Stack,
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
}) => (
  <div className="ms-Grid-row">
    {/* Profile handleUploadButtonClick*/}
    <div className="ms-Grid-col ms-sm4 ms-lg2">
      {isVerifying && <Spinner label="Verifying..." size={SpinnerSize.large} />}
      {imgIsLoading && <Spinner label="Loading..." size={SpinnerSize.large} />}
      {!isVerifying && !file && <MessageBar>No photo uploaded.</MessageBar>}
      {!isVerifying && file && file.downloadURL && (
        <Image
          src={file.downloadURL}
          imageFit={ImageFit.contain}
          height={130}
          onLoad={handleLoad}
        />
      )}
    </div>

    {/* Media Source Choice Box & File Input Button*/}
    <div className="ms-Grid-col ms-sm8 ms-lg4">
      <MediaSourceForm
        disabled={isVerifying || isUploading}
        mediaSource={mediaSource}
        handleMediaSourceChange={handleMediaSourceChange}
      />
      {/* File Input*/}
      {mediaSource === 'file' && (
        <div className="ms-Grid-col ms-sm12">
          <FileInputButton
            primary={!!file}
            secondary={!file}
            disabled={isUploading || isVerifying || imgIsLoading}
            onChange={handleFileInputChange}
            text={file ? 'Edit Photo' : 'Upload Photo'}
            fileInputRef={fileInputRef}
          />
        </div>
      )}
    </div>

    {/* WebCam Video*/}
    {mediaSource === 'webcam' && (
      <div
        className="ms-Grid-col ms-sm12 ms-lg6"
        styles={{root: {marginBottom: '10px'}}}
      >
        <div className="ms-Grid-col ms-lg5">
          <video style={{width: '100%'}} ref={webcamRef}></video>
          <DefaultButton primary text="Click Photo" onClick={clickPhoto} />
        </div>
      </div>
    )}

    {/* Image Croppie With Preview Modal Button & Upload Button*/}
    {mediaSource && (
      <div className="ms-Grid-col ms-sm12 ms-lg12">
        <div ref={croppieRef}></div>
        {croppedDataURL && (
          <div>
            <Stack
              horizontal
              tokens={{childrenGap: '20'}}
              horizontalAlign="center"
            >
              <Stack veritical>
                <UploadButton
                  onClick={handleUploadButtonClick}
                  disabled={isUploading}
                />
                {isUploading && (
                  <div>
                    <ProgressIndicator percentComplete={progress / 100} />
                    <Spinner size={SpinnerSize.lg} label="Uploading..." />
                  </div>
                )}
              </Stack>
              <PreviewModal imgSrc={croppedDataURL} />
            </Stack>
          </div>
        )}
      </div>
    )}
  </div>
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
}

export default FirebaseSuperCroppie
