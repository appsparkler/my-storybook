import React from 'react'
import PropTypes from 'prop-types'
import { Stack } from 'office-ui-fabric-react'

const CameraStreamVideo = ({ videoRef }) => (
  <Stack.Item align="center">
    <div
      style={{
        width: '200px',
        height: '200px',
        outline: '1px lightGray solid',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
      }}
    >
      <video height="200" width="200" ref={videoRef}></video>
    </div>
  </Stack.Item>
)

CameraStreamVideo.propTypes = {
  videoRef: PropTypes.shape({
    current: PropTypes.any,
  }),
}

export default CameraStreamVideo
