import React from 'react'
import PropTypes from 'prop-types'
import {
  Stack, IconButton, Callout
} from '@fluentui/react'
import ShowHide from '../ShowHide'

export const CustomLabel  = ({
  showCallout, label,
  iconButton, labelWrapperStack,
  contentWrapperStack,
  calloutContent
}) => (
  <>
    <Stack
      {...labelWrapperStack}
    >
      <span>
        {label}
      </span>
      <IconButton
        {...iconButton}
      />
    </Stack>
    <ShowHide show={showCallout}>
      <Callout>
        <Stack {...contentWrapperStack}>
          <span>
            {calloutContent}
          </span>
        </Stack>
      </Callout>
    </ShowHide>
  </>
)

CustomLabel.propTypes = {
  labelWrapperStack: PropTypes.object,
  label: PropTypes.string,
  showCallout: PropTypes.bool,
  iconButton: PropTypes.object,

}


export default React.memo(CustomLabel);
