import React from 'react';
import PropTypes from 'prop-types';
import {CustomLabelVariantA} from '../../../components/CustomLabel/variantA'
import {
  MaskedTextField, PrimaryButton,
  Stack
} from '@fluentui/react'

const ScheduledSlotForm = ({onSubmit}) => (
  <form onSubmit={onSubmit}>
    <Stack tokens={{childrenGap: 10 }}>
      <MaskedTextField
        label="Start Time"
        content="In MM-DD-YYYY HH:mm format..."
        required
        mask="99-99-9999 99:99"
        text="Hello"
        onRenderLabel={(props) => <CustomLabelVariantA {...props}/>}
      />
      <MaskedTextField
        label="End Time"
        content="In MM-DD-YYYY HH:mm format..."
        required
        mask="99-99-9999 99:99"
        onRenderLabel={(props) => <CustomLabelVariantA {...props}/>}
      />
      <PrimaryButton
        type="submit"
        text="Add Slot"
        iconProps={{
          iconName: 'Add'
        }}
      />
    </Stack>
  </form>
);

ScheduledSlotForm.propTypes = {
  onSubmit: PropTypes.func
};

export default ScheduledSlotForm;
