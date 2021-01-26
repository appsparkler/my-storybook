import React from 'react'
import PropTypes from 'prop-types'
import { MaskedTextField, Stack, Text, mergeStyleSets } from '@fluentui/react'
import CustomLabel from '../../../../components/CustomLabel/variantA'

const GoalForTheDayFormLayout = ({
  titleText,
  form,
  hoursTextField,
  minutesTextField,
}) => (
  <form {...form}>
    <Text {...titleText} />
    <Stack horizontal tokens={{ childrenGap: 5 }}>
      <MaskedTextField {...hoursTextField} />
      <MaskedTextField {...minutesTextField} />
    </Stack>
  </form>
)

const classNames = mergeStyleSets({
  textField: {
    maxWidth: 90,
  },
})

const onRenderLabel = (props) => <CustomLabel {...props} />
//
const onClickSelection = (evt) => {
  const elem = evt.target
  elem.select()
  elem.select(0, 99999)
}

export const isInRange = ({ min, max, value }) => {
  const numberVal = Number(value, 10)
  const isNumber = !isNaN(numberVal)
  if (isNumber) {
    const isLessThanMin = numberVal < Number(min)
    const isGreaterThanMax = numberVal > Number(max)
    return !isLessThanMin && !isGreaterThanMax
  } else {
    return false
  }
}

export const getGoalInMinutes = ({ hours, minutes }) => {
  const isHoursNaN = isNaN(Number(hours))
  const isMinutesNaN = isNaN(Number(minutes))
  const isAnyNaN = isHoursNaN || isMinutesNaN
  if (isAnyNaN) return 0
  const goalInMinutes = Number(hours) * 60 + Number(minutes)
  return goalInMinutes
}

const GoalForTheDayForm = ({
  onChangeGoal,
  hours,
  hoursErrorMessage,
  minutes,
  minutesErrorMessage,
  hoursDisabled,
  onHoursInputError,
  onMinutesInputError,
}) => {
  const hoursTextField = React.useMemo(
    () => ({
      className: classNames.textField,
      content: 'A value between 00 and 24.',
      mask: '99',
      errorMessage: hoursErrorMessage,
      label: 'Hours',
      value: hours,
      onClick: onClickSelection,
      onRenderLabel,
      onChange: (evt, value) => {
        const valueHasMask = Boolean(/_/.test(value))
        if (valueHasMask) return
        const isValid = isInRange({
          min: 0,
          max: 24,
          value,
        })
        if (isValid) {
          onChangeGoal({ hours: value })
        } else {
          onHoursInputError({ errorMessage: '00 - 24' })
        }
      },
    }),
    [onHoursInputError, onChangeGoal, hours, hoursErrorMessage]
  )

  const minutesTextField = React.useMemo(
    () => ({
      value: minutes,
      className: classNames.textField,
      content: 'A value between 00 and 59.',
      mask: '99',
      label: 'Minutes',
      onClick: onClickSelection,
      onRenderLabel,
      errorMessage: minutesErrorMessage,
      onChange: (evt, value) => {
        const valueHasMask = Boolean(/_/.test(value))
        if (valueHasMask) return
        const isValid = isInRange({
          min: 0,
          max: 59,
          value,
        })
        if (isValid) {
          onChangeGoal({
            minutes: value,
          })
        } else {
          onMinutesInputError(value)
        }
      },
    }),
    [onChangeGoal, minutes, onMinutesInputError, minutesErrorMessage]
  )

  const titleText = React.useMemo(
    () => ({
      children: '🎯Goal For The Day',
      variant: 'mediumPlus',
    }),
    []
  )

  const goalForTheDayForm = {
    titleText,
    hoursTextField,
    minutesTextField,
    form: {
      onSubmit: React.useCallback((evt) => {
        evt.preventDefault()
        evt.stopPropagation()
      }, []),
    },
  }

  return <GoalForTheDayFormLayout {...goalForTheDayForm} />
}

GoalForTheDayForm.propTypes = {
  onChangeGoal: PropTypes.func,
  onHoursInputError: PropTypes.func,
  onMinutesInputError: PropTypes.func,
  hours: PropTypes.string,
  minutes: PropTypes.string,
  hoursErrorMessage: PropTypes.string,
  minutesErrorMessage: PropTypes.string,
}

GoalForTheDayForm.defaultProps = {
  hours: '09',
  minutes: '02',
}

export default React.memo(GoalForTheDayForm)
