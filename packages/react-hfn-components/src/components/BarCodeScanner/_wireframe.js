import React from 'react'
import {
  Stack,
  DefaultButton,
  ChoiceGroup,
  TextField,
  // MessageBar, MessageBarType, MessageBarButton,Layer,
  Modal,
  IconButton,
} from 'office-ui-fabric-react'

const BarCodeScannerWireframe = ({}) => (
  <Stack
    tokens={{
      childrenGap: 20,
      padding: 10,
    }}
    style={{ outline: '1px blue solid' }}
  >
    <Stack.Item align="center">
      <div
        style={{
          width: '300px',
          height: '300px',
          outline: '1px blue solid',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
        }}
      >
        Video
      </div>
    </Stack.Item>
    <Stack.Item align="center">
      <ChoiceGroup
        label="Select Camera"
        options={[
          { key: 'A', text: 'Option A' },
          { key: 'B', text: 'Option B' },
        ]}
      />
    </Stack.Item>
    <Stack.Item align="center">
      <DefaultButton secondary text="Start Scanning" />
    </Stack.Item>
    {/* <Layer>
      <MessageBar
        actions={
          <div>
            <MessageBarButton>Yes</MessageBarButton>
            <MessageBarButton>No</MessageBarButton>
          </div>
        }
        messageBarType={MessageBarType.success}
        isMultiline={false}
      >
          Scanned Output: INAAAE478
      </MessageBar>
    </Layer>*/}
    <Modal isOpen={true}>
      <Stack horizontal horizontalAlign="end">
        <Stack.Item>
          <IconButton
            iconProps={{ iconName: 'Cancel' }}
            ariaLabel="Close popup modal"
          />
        </Stack.Item>
      </Stack>

      <Stack>
        <Stack.Item>
          <div style={{ padding: '10px' }}>
            <TextField
              label="Result"
              defaultValue=""
              multiline={3}
              autoAdjustHeight
            />
          </div>
        </Stack.Item>
      </Stack>
    </Modal>
  </Stack>
)

export default BarCodeScannerWireframe
