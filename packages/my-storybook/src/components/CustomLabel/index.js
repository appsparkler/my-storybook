import React from 'react'
import PropTypes from 'prop-types'
import { Stack, IconButton, Callout, Label } from '@appsparkler/fluentui-react'
import ShowHide from '../ShowHide'

const CustomLabel = ({
  showCallout,
  label,
  iconButton,
  labelWrapperStack,
  contentWrapperStack,
  calloutContent,
  callout,
}) => {
  return (
    <>
      <Stack {...labelWrapperStack}>
        <Label>{label}</Label>
        <IconButton {...iconButton} />
      </Stack>
      <ShowHide show={showCallout}>
        <Callout {...callout}>
          <Stack {...contentWrapperStack}>
            <span>{calloutContent}</span>
          </Stack>
        </Callout>
      </ShowHide>
    </>
  )
}

CustomLabel.propTypes = {
  labelWrapperStack: PropTypes.object,
  label: PropTypes.string,
  showCallout: PropTypes.bool,
  iconButton: PropTypes.object,
}

export default React.memo(CustomLabel)
