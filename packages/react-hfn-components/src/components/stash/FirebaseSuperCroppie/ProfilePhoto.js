import React from 'react'
import PropTypes from 'prop-types'
import {
  Stack,
  Image,
  Spinner,
  SpinnerSize,
  MessageBar,
} from 'office-ui-fabric-react'

const ProfilePhoto = ({imgIsLoading, isVerifying, file, onLoad}) => (
  <Stack.Item align="end">
    <Stack maxHeight={180} maxWidth={180}>
      <Stack.Item align="end">
        {isVerifying && (
          <Stack
            verticalAlign="center"
            style={{height: '180px', width: '180px'}}
          >
            <Stack.Item>
              <Spinner label="Verifying..." size={SpinnerSize.large} />
            </Stack.Item>
          </Stack>
        )}
        {imgIsLoading && (
          <Stack
            verticalAlign="center"
            style={{height: '180px', width: '180px'}}
          >
            <Stack.Item>
              <Spinner label="Loading..." size={SpinnerSize.large} />
            </Stack.Item>
          </Stack>
        )}
        {!isVerifying && file && file.downloadURL && (
          <Image
            src={file.downloadURL}
            height={180}
            width={180}
            startOnVisibile
            onLoad={onLoad}
          />
        )}
        {!isVerifying && !file && <MessageBar>No Photo Uploaded</MessageBar>}
      </Stack.Item>
    </Stack>
  </Stack.Item>
)

ProfilePhoto.propTypes = {
  imgIsLoading: PropTypes.bool.isRequired,
  file: PropTypes.shape({
    downloadURL: PropTypes.string,
  }),
  isVerifying: PropTypes.bool,
  onLoad: PropTypes.func.isRequired,
}

export default ProfilePhoto
