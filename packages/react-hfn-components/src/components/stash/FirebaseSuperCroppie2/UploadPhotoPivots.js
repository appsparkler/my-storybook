import * as React from 'react'
import {
  Stack,
  DefaultButton,
  Pivot,
  PivotItem,
  mergeStyleSets,
  Image,
} from 'office-ui-fabric-react'
import ChooseFileButton from './ChooseFileButton'
import PropTypes from 'prop-types'

export const UploadPhotoPivots = (props) => {
  return (
    <Pivot
      aria-label="Basic Pivot Example"
      defaultSelectedIndex={0}
      selectedKey={props.selectedPivotKey}
      onLinkClick={() => {
        debugger
      }}
    >
      <PivotItem
        headerText="Upload File"
        headerButtonProps={{
          'data-order': 1,
          'data-title': 'My Files Title',
        }}
      >
        <Stack
          vertical
          verticalAlign="center"
          horizontalAlign="center"
          padding={30}
        >
          <ChooseFileButton {...props} />
        </Stack>
      </PivotItem>
      <PivotItem headerText="Use Webcam">
        <Stack
          horizontalAlign="center"
          tokens={{
            childrenGap: 20,
            padding: 10,
          }}
        >
          <div className={contentStyles.videoPlaceholderStyles}>
            Webcam Video Stream Placeholder
          </div>
          <DefaultButton primary text="Take Snapshot" />
        </Stack>
      </PivotItem>
      <PivotItem headerText="Data URI" itemKey="croppie">
        <Stack horizontalAlign="center" tokens={{ padding: 20 }}>
          <Image src={props.dataURI} width={350} />
        </Stack>
      </PivotItem>
    </Pivot>
  )
}

UploadPhotoPivots.propTypes = {
  dataURI: PropTypes.string,
  selectedPivotKey: PropTypes.string,
}

const contentStyles = mergeStyleSets({
  videoPlaceholderStyles: {
    width: '300px',
    height: '300px',
    outline: '1px slateBlue dashed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
