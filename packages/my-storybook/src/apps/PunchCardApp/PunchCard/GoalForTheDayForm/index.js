import React from 'react'
import PropTypes from 'prop-types'
import { MaskedTextField, Stack, Text, mergeStyleSets } from '@fluentui/react'
// import _set from 'lodash/set'
// import _debounce from 'lodash/debounce'
import CustomLabel from '../../../../components/CustomLabel/variantA'

const GoalForTheDayFormLayout = ({
  titleText,
  form,
  hoursTextField,
  maskedTextField1,
}) => (
  <form {...form}>
    <Text {...titleText} />
    <Stack horizontal tokens={{ childrenGap: 5 }}>
      <MaskedTextField {...hoursTextField} />
      <MaskedTextField {...maskedTextField1} />
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
  const [state, setState] = React.useState({
    hoursTextField: {
      className: classNames.textField,
      content: 'A value between 00 and 24.',
      mask: '99',
      label: 'Hours',
      onClick: onClickSelection,
      onRenderLabel,
      errorMessage: '',
    },
    maskedTextField1: {
      className: classNames.textField,
      content: 'A value between 00 and 59.',
      mask: '99',
      label: 'Minutes',
      onClick: onClickSelection,
      onRenderLabel,
    },
  })

  // const updateErrorMessageOnMinutes = React.useMemo(() => {
  //   return _debounce((errorMessage) => {
  //     setState((currentState) => {
  //       const updatedState = _set(
  //         { ...currentState },
  //         'maskedTextField1.errorMessage',
  //         errorMessage
  //       )
  //       return updatedState
  //     })
  //   }, 800)
  // }, [])

  const hoursTextField = React.useMemo(
    () => ({
      className: classNames.textField,
      content: 'A value between 00 and 24.',
      mask: '99',
      label: 'Hours',
      value: hours,
      onClick: onClickSelection,
      onRenderLabel,
      errorMessage: '',
      onChange: (evt, value) => {
        const valueHasMask = Boolean(/_/.test(value))
        const isValid = isInRange({
          min: 0,
          max: 24,
          value,
        })
        if (isValid) {
          onChangeGoal({ hours: value })
        } else {
          if (!valueHasMask) onHoursInputError({ errorMessage: '00 - 24' })
        }
      },
    }),
    [onHoursInputError, onChangeGoal, hours]
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
    form: {
      onSubmit: React.useCallback((evt) => {
        evt.preventDefault()
        evt.stopPropagation()
      }, []),
    },
    maskedTextField1: {
      value: minutes,
      ...state.maskedTextField1,
      onChange: React.useCallback(
        (evt, value) => {
          const isValid = isInRange({
            min: 0,
            max: 59,
            value,
          })
          if (isValid) {
            onChangeGoal({
              minutes: value,
            })
            // updateErrorMessageOnMinutes('')
          } else {
            // updateErrorMessageOnMinutes('00 - 59')
          }
        },
        [onChangeGoal]
      ),
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
