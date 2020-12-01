import React from 'react'
import {
  Stack
} from '@fluentui/react';
import PunchInButton from '../PunchInButton'
import AddScheduledSlotButton from '../AddScheduledSlotButton'

const ButtonGroupLayout = ({
  punchInButton, addScheduledSlotButton
}) => (
  <Stack>
    <PunchInButton {...punchInButton}/>
    <AddScheduledSlotButton {...addScheduledSlotButton} />
  </Stack>
);

export const ButtonGroup = () => {

  const buttonGroup = {
    punchInButton: {},
    addScheduledSlotButton: {}
  };

  return (
    <ButtonGroupLayout {...buttonGroup} />
  )
}
