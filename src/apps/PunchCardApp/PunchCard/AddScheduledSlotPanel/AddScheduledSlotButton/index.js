import React from 'react';
import AddScheduledSlotPanel from '../'
import {DefaultButton, IconButton} from '@fluentui/react'

const AddScheuduledSlotButtonLayout = ({
  addScheduledSlotPanel,
  defaultButton, iconButton
}) => (
  <>
    <DefaultButton {...defaultButton} />
    <IconButton {...iconButton}/>
    <AddScheduledSlotPanel {...addScheduledSlotPanel} />
  </>
);

const AddScheuduledSlotButton = () => {

  return <AddScheuduledSlotButtonLayout />
}

export default AddScheuduledSlotButton;
