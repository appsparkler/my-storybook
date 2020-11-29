import React from 'react';
import PropTypes from 'prop-types';
import {CustomLabelVariantA} from '../../../components/CustomLabel/variantA'
import {
  MaskedTextField, PrimaryButton,
  Stack, mergeStyleSets
} from '@fluentui/react'
import moment from 'moment'

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
  const classNames = React.useMemo(() => mergeStyleSets({
    textField: {
      maxWidth: 130
    }
  }),[])

  const [state, setState] = React.useState({
    maskedTextField0: {
      className: classNames.textField,
      label:"Start Time *",
      content:"In YYYY-MM-DD HH:mm format...",
      required: true,
      mask:"9999-99-99 99:99",
      text:"Hello",
      onRenderLabel:(props) => <CustomLabelVariantA {...props} />,
      value: ''
    },
    maskedTextField1: {
      className: classNames.textField,
      label:"End Time *",
      content:"In YYYY-MM-DD HH:mm format...",
      required: true,
      mask:"9999-99-99 99:99",
      value: '',
      onRenderLabel: (props) =>  <CustomLabelVariantA {...props} />
    },
    primaryButton0: {
      type:"submit",
      text:"Add Slot",
      iconProps:{
        iconName: 'Add'
      }
    }
  });

  const updateMaskedTextField0Value = React.useCallback((evt, value) => {
    setState(currentState => ({
      ...currentState,
      maskedTextField0: {
        ...currentState.maskedTextField0,
        value
      },
    }))
  },[])

  const updateMaskedTextField1Value = React.useCallback((evt, value) => {
    setState(currentState => ({
      ...currentState,
      maskedTextField1: {
        ...currentState.maskedTextField1,
        value
      },
    }))
  },[])

  const resetFields = React.useCallback(() => {
    setState(currentState => ({
      ...currentState,
      maskedTextField0: {
        ...currentState.maskedTextField0,
        value: ''
      },
      maskedTextField1: {
        ...currentState.maskedTextField1,
        value: ''
      },
    }))
  },[])

  const scheduledSlotForm =  {
    form: {
      onSubmit: React.useCallback((evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        const format = 'YYYY-MM-DD HH:mm'
        const startTime = state.maskedTextField0.value;
        const endTime = state.maskedTextField1.value;
        const startTimeMoment = moment(startTime, format);
        const endTimeMoment = moment(endTime, format);
        const isEndTimeGreaterThanStartTime = endTimeMoment > startTimeMoment;
        const momentsAreValid = startTimeMoment.isValid() && endTimeMoment.isValid();
        const ok2Submit = isEndTimeGreaterThanStartTime && momentsAreValid;
        if(ok2Submit) {
          onSubmit({
            startTime: startTimeMoment.valueOf(),
            endTime: endTimeMoment.valueOf()
          })
          resetFields()
        }
      },[
        onSubmit, resetFields,
        state.maskedTextField1.value,
        state.maskedTextField0.value,
      ])
    },
    maskedTextField0: {
      ...state.maskedTextField0,
      onChange: updateMaskedTextField0Value
    },
    maskedTextField1: {
      ...state.maskedTextField1,
      onChange: updateMaskedTextField1Value
    },
    primaryButton0: {
      ...state.primaryButton0
    }
  }

  return <ScheduledSlotFormLayout {...scheduledSlotForm} />
}

ScheduledSlotForm.propTypes = {
  onSubmit: PropTypes.func
};

export default ScheduledSlotForm;
