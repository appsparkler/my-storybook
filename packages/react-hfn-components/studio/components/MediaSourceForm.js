import React from 'react'
import { ChoiceGroup } from 'office-ui-fabric-react'

const options = [
  { key: 'file', text: 'Upload', iconProps: { iconName: 'CloudUpload' } },
  { key: 'webcam', text: 'Webcam', iconProps: { iconName: 'Webcam2' } },
]

const StudioApp = () => {
  const [mediaSource, setMediaSource] = React.useState(null)
  return (
    <div className="ms-Grid" dir="ltr">
      <ChoiceGroup
        label="Upload photo"
        selectedKey={mediaSource}
        options={options}
        onChange={(evt, selectedOption) => {
          const value = selectedOption.key
          setMediaSource(value)
        }}
      />
    </div>
  )
}

export default StudioApp
