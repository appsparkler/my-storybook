import React from 'react'
import PropTypes from 'prop-types'
import {
  Layer,
  MessageBar,
  MessageBarButton,
  MessageBarType,
} from 'office-ui-fabric-react'

const ConfirmationLayer = ({ result, saveResult, resetResult }) => (
  <Layer>
    <MessageBar
      actions={
        <div>
          <MessageBarButton onClick={saveResult}>Save</MessageBarButton>
          <MessageBarButton onClick={resetResult}>Dismiss</MessageBarButton>
        </div>
      }
      messageBarType={MessageBarType.success}
      isMultiline={false}
    >
      Scanned Output: {result.text}
    </MessageBar>
  </Layer>
)

ConfirmationLayer.propTypes = {
  result: PropTypes.object,
  saveResult: PropTypes.func.isRequired,
  resetResult: PropTypes.func.isRequired,
}

export default ConfirmationLayer
