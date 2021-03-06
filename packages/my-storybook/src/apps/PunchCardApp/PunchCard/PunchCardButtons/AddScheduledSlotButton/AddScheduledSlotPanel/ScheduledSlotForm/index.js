import React from 'react'
import PropTypes from 'prop-types'
import CustomLabelVariantA from '../../../../../../../components/CustomLabel/variantA'
import {
  MaskedTextField,
  PrimaryButton,
  Stack,
  mergeStyleSets,
} from '@fluentui/react'
import moment from 'moment'
import { v4 as uuid } from 'uuid'

const ScheduledSlotFormLayout = ({
  form,
  maskedTextField0,
  maskedTextField1,
  primaryButton0,
}) => (
  <form {...form}>
    <Stack tokens={{ childrenGap: 10 }}>
      <Stack.Item>
        <Stack horizontal tokens={{ childrenGap: 5 }}>
          <MaskedTextField {...maskedTextField0} />
          <MaskedTextField {...maskedTextField1} />
        </Stack>
      </Stack.Item>
      <PrimaryButton {...primaryButton0} />
    </Stack>
  </form>
)

const FORMAT = 'YYYY-MM-DD HH:mm'

export const getIsOk2Submit = ({ inTime, outTime }) => {
  const FORMAT = 'YYYY-MM-DD HH:mm'
  const inTimeMoment = moment(inTime, FORMAT)
  const outTimeMoment = moment(outTime, FORMAT)
  const isoutTimeGreaterThaninTime = outTimeMoment > inTimeMoment
  const momentsAreValid = inTimeMoment.isValid() && outTimeMoment.isValid()
  const isOK2Submit = isoutTimeGreaterThaninTime && momentsAreValid
  if (isOK2Submit) {
    return {
      inTime: inTimeMoment.valueOf(),
      outTime: outTimeMoment.valueOf(),
    }
  }
  return false
}

const onDateTimeFieldClick = (evt) => {
  const elem = evt.target
  elem.selectionStart = 11
  elem.selectionEnd = 16
}

const getInitialValue = (hours) =>
  moment().add(hours, 'hours').startOf('hour').format(FORMAT)

const ScheduledSlotForm = ({ onSubmit, initialInTime, initialOutTime }) => {
  const classNames = React.useMemo(
    () =>
      mergeStyleSets({
        textField: {
          maxWidth: 130,
        },
      }),
    []
  )

  const [state, setState] = React.useState({
    maskedTextField0: {
      className: classNames.textField,
      label: 'Start Time *',
      content: `In ${FORMAT} format...`,
      required: true,
      mask: '9999-99-99 99:99',
      text: 'Hello',
      onRenderLabel: (props) => <CustomLabelVariantA {...props} />,
      onClick: onDateTimeFieldClick,
      value: initialInTime || getInitialValue(1),
    },
    maskedTextField1: {
      className: classNames.textField,
      label: 'End Time *',
      content: `In ${FORMAT} format...`,
      required: true,
      mask: '9999-99-99 99:99',
      value: initialOutTime || getInitialValue(2),
      onClick: onDateTimeFieldClick,
      onRenderLabel: (props) => <CustomLabelVariantA {...props} />,
    },
    primaryButton0: {
      type: 'submit',
      text: 'Add Slot',
      iconProps: {
        iconName: 'Add',
      },
    },
  })

  const updateMaskedTextField0Value = React.useCallback((evt, value) => {
    setState((currentState) => ({
      ...currentState,
      maskedTextField0: {
        ...currentState.maskedTextField0,
        value,
      },
    }))
  }, [])

  const updateMaskedTextField1Value = React.useCallback((evt, value) => {
    setState((currentState) => ({
      ...currentState,
      maskedTextField1: {
        ...currentState.maskedTextField1,
        value,
      },
    }))
  }, [])

  const resetFields = React.useCallback(() => {
    setState((currentState) => ({
      ...currentState,
      maskedTextField0: {
        ...currentState.maskedTextField0,
        value: '',
      },
      maskedTextField1: {
        ...currentState.maskedTextField1,
        value: '',
      },
    }))
  }, [])

  const scheduledSlotForm = {
    form: {
      onSubmit: React.useCallback(
        (evt) => {
          evt.preventDefault()
          evt.stopPropagation()
          const startEndTime = getIsOk2Submit({
            inTime: state.maskedTextField0.value,
            outTime: state.maskedTextField1.value,
          })
          if (startEndTime) {
            onSubmit({
              id: uuid(),
              ...startEndTime,
            })
            resetFields()
          }
        },
        [
          onSubmit,
          resetFields,
          state.maskedTextField0.value,
          state.maskedTextField1.value,
        ]
      ),
    },
    maskedTextField0: {
      ...state.maskedTextField0,
      onChange: updateMaskedTextField0Value,
    },
    maskedTextField1: {
      ...state.maskedTextField1,
      onChange: updateMaskedTextField1Value,
    },
    primaryButton0: {
      ...state.primaryButton0,
    },
  }

  return <ScheduledSlotFormLayout {...scheduledSlotForm} />
}

ScheduledSlotForm.propTypes = {
  onSubmit: PropTypes.func,
  initialInTime: PropTypes.string,
  initialOutTime: PropTypes.string,
}

export default React.memo(ScheduledSlotForm)
