import React from 'react';
import { TextField} from '@fluentui/react'

const CopyTextTool = ({
  text, onClickCopy,copyTextFieldRef
}) => (
  <TextField
    secondary
    onClick={onClickCopy}
    style={{border: "2px lightgray dashed"}}
    iconProps={{iconName: 'Copy'}}
    value={text}
    ref={copyTextFieldRef}
    label="Timestamp"
  />
)

export default React.memo(CopyTextTool)
