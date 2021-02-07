import React from 'react'
import PropTypes from 'prop-types'
import {
  Stack,
  Spinner,
  SpinnerSize,
  Link,
  MessageBar,
} from 'office-ui-fabric-react'

const FirebaseFileLink = ({file, isVerifying, isUploading}) => (
  <Stack maxWidth={200} maxHeight={50} verticalAlign="center">
    <Stack.Item>
      {!isUploading && !isVerifying && file && (
        <Link
          href={file.downloadURL}
          style={{
            maxWidth: '150px',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            display: 'inline-block',
            textAlign: 'right',
          }}
        >
          {file.fileName}
        </Link>
      )}
      {isUploading && <Spinner label="Uploading..." size={SpinnerSize.large} />}
      {isVerifying && <Spinner label="Verifying..." size={SpinnerSize.large} />}
      {!file && !isVerifying && !isUploading && (
        <MessageBar>File not uploaded...</MessageBar>
      )}
    </Stack.Item>
  </Stack>
)

FirebaseFileLink.propTypes = {
  file: PropTypes.object,
  isVerifying: PropTypes.bool.isRequired,
  isUploading: PropTypes.bool,
}

export default FirebaseFileLink
