import React from 'react'
import PropTypes from 'prop-types'
import BSAlert from '@app/legacy/BSAlert'
import useFileLink from './useFileLink'

function FileLink(props) {
  const {isVerifying, file} = useFileLink(props)
  return (
    <>
      {props.components?.fileLink && (
        <props.components.fileLink isVerifying={isVerifying} file={file} />
      )}
      {!props.components?.fileLink && (
        <div className="FileLink">
          {isVerifying && (
            <BSAlert type="info" msg={props.isVerifyingMessage} />
          )}
          {file?.downloadURL && file?.fileName && (
            <a href={file.downloadURL}>{file.fileName}</a>
          )}
        </div>
      )}
    </>
  )
}

FileLink.propTypes = {
  isVerifyingMessage: PropTypes.string,
  storageRef: PropTypes.object.isRequired,
  file: PropTypes.object,
  components: PropTypes.object,
}

FileLink.defaultProps = {
  isVerifyingMessage: 'Verifying...',
}

export default FileLink

/*
{
  isVerifying && (
    <HelpBlock msg={props.isVerifyingMessage} />
  )
}
{
  !isVerifying && file && (
    <a href={file && file.downloadUrl} target="__blank">
      {file && file.fileName}
    </a>
  )
}
*/
