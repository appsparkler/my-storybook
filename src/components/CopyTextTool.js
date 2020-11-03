import React from 'react';
import { TextField} from '@fluentui/react'

const CopyTextTool = ({
  text, onClickCopy,hiddenInputRef
}) => (
  <TextField
    secondary
    onClick={onClickCopy}
    style={{border: "2px lightgray dashed"}}
    iconProps={{iconName: 'Copy'}}
    value={text}
    ref={hiddenInputRef}
  >
  </TextField>
)

export default React.memo(CopyTextTool)
