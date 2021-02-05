import React from 'react'
import {
  DefaultButton,
  Stack,
  ProgressIndicator,
  Spinner,
  SpinnerSize,
} from 'office-ui-fabric-react'
import './styles'

const StudioApp = () => {
  return (
    <Stack horizontal tokens={{ childrenGap: 20 }}>
      <Stack tokens={{ childrenGap: 10 }}>
        <DefaultButton text="Upload" primary />
        <Spinner label="Uploading" size={SpinnerSize.large} />
        <ProgressIndicator progressPercent=".8" />
      </Stack>
      <DefaultButton text="Preview" secondary />
    </Stack>
  )
}

export default StudioApp
