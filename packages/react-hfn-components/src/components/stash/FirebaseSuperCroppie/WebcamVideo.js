import React from 'react'
import PropTypes from 'prop-types'
import {Stack, DefaultButton} from 'office-ui-fabric-react'

const WebcamVideo = ({webcamRef, onClick}) => (
  <Stack.Item align="end">
    <Stack vertical tokens={{childrenGap: 10}}>
      <video
        style={{minWidth: '200px', width: '300px'}}
        ref={webcamRef}
      ></video>
      <DefaultButton primary text="Click Photo" onClick={onClick} />
    </Stack>
  </Stack.Item>
)

WebcamVideo.propTypes = {
  webcamRef: PropTypes.shape({
    current: PropTypes.any,
  }),
  onClick: PropTypes.func.isRequired,
}

export default WebcamVideo
