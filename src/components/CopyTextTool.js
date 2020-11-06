import React from 'react';
import { TextField} from '@fluentui/react'

const CopyTextTool = ({
  text, onClickCopy
}) => (
  <TextField
    secondary
    onClick={onClickCopy}
    style={{border: "2px lightgray dashed"}}
    iconProps={{iconName: 'Copy'}}
    value={text}
    label="Timestamp"
    readOnly
  />
)

export default React.memo(CopyTextTool)
