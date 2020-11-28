import React from 'react';
import PropTypes from 'prop-types';
import {CustomLabelVariantA} from '../../../components/CustomLabel/variantA'
import {
  MaskedTextField, PrimaryButton,
  Stack
} from '@fluentui/react'

const ScheduledSlotFormLayout = ({
  form,
  maskedTextField0, maskedTextField1,
  primaryButton0
}) => (
  <form {...form}>
    <Stack tokens={{childrenGap: 10 }}>
      <MaskedTextField
        {...maskedTextField0}
      />
      <MaskedTextField
        {...maskedTextField1}
      />
      <PrimaryButton
        {...primaryButton0}
      />
    </Stack>
  </form>
);

export const ScheduledSlotForm = ({
  onSubmit
}) => {

  const scheduledSlotForm =  {
    form: {
      onSubmit: React.useCallback((evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        onSubmit(evt)
      },[onSubmit])
    },
    maskedTextField0: {
      label:"Start Time *",
      content:"In MM-DD-YYYY HH:mm format...",
      required: true,
      mask:"99-99-9999 99:99",
      text:"Hello",
      onRenderLabel:(props) => <CustomLabelVariantA {...props} />
    },
    maskedTextField1: {
      label:"End Time *",
      content:"In MM-DD-YYYY HH:mm format...",
      required: true,
      mask:"99-99-9999 99:99",
      onRenderLabel: (props) =>  <CustomLabelVariantA {...props} />
    },
    primaryButton0: {
      type:"submit",
      text:"Add Slot",
      iconProps:{
        iconName: 'Add'
      }
    }
  }

  return <ScheduledSlotFormLayout {...scheduledSlotForm} />
}

ScheduledSlotForm.propTypes = {
  onSubmit: PropTypes.func
};

export default ScheduledSlotForm;
