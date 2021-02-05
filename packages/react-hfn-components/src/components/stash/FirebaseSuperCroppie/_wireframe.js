import React from 'react'
import { Stack, Image, DefaultButton } from 'office-ui-fabric-react'
import MediaSourceForm from './components/MediaSourceForm'
import './styles'

const WireFrame = () => {
  return (
    <div className="ms-Grid" dir="ltr">
      <div className="ms-Grid-row">
        <Stack horizontalAlign="center" horizontal gap="20" wrap>
          <Stack.Item>
            <Image
              width="100%"
              height="100%"
              src="http://placekitten.com/180/180"
            />
          </Stack.Item>
          <Stack.Item align="end">
            <MediaSourceForm />
          </Stack.Item>

          <Stack.Item align="center">
            <Stack horizontalAlign="center" style={{ minWidth: '100vw' }}>
              <DefaultButton text="Edit Photo" />
            </Stack>
          </Stack.Item>

          <Stack.Item align="end">
            <Stack horizontalAlign="center" style={{ width: '100vw' }}>
              <video src="https://youtu.be/MLeIBFYY6UY" controls="true"></video>
            </Stack>
          </Stack.Item>

          <Stack.Item>
            <Stack horizontalAlign="center" style={{ width: '100vw' }}>
              <div>Croppie</div>
            </Stack>
          </Stack.Item>
        </Stack>
      </div>
    </div>
  )
}

export default WireFrame
