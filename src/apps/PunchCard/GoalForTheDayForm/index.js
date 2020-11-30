import React from 'react'
import PropTypes from 'prop-types'
import {
  MaskedTextField, Stack,
  Text, mergeStyleSets
} from '@fluentui/react'
import _set from 'lodash/set'
import _debounce from 'lodash/debounce'
import CustomLabel from '../../../components/CustomLabel/variantA'

const GoalForTheDayFormLayout = ({
  text0, form,
  maskedTextField0, maskedTextField1
}) => (
  <form {...form}>
      <Text {...text0}/>
      <Stack horizontal tokens={{childrenGap: 5}}>
        <MaskedTextField {...maskedTextField0} />
        <MaskedTextField {...maskedTextField1} />
      </Stack>
  </form>
)

const classNames = mergeStyleSets({
  textField: {
    maxWidth: 90
  }
})

const onRenderLabel = (props) => <CustomLabel {...props}/>

const onClickSelection = (evt) => {
  const elem = evt.target;
  elem.select();
  elem.select(0, 99999);
}

export const isInRange = ({
  min, max, value
}) => {
  const numberVal = Number(value, 10);
  const isNumber = !isNaN(numberVal);
  if(isNumber) {
    const isLessThanMin = numberVal < Number(min);
    const isGreaterThanMax = numberVal > Number(max);
    return !isLessThanMin && !isGreaterThanMax;
  } else {
    return false;
  }
}

export const getGoalInMinutes = ({hours, minutes}) => {
  const isHoursNaN  = isNaN(Number(hours));
  const isMinutesNaN = isNaN(Number(minutes));
  const isAnyNaN = isHoursNaN || isMinutesNaN
  if(isAnyNaN) return 0;
  const goalInMinutes =  (Number(hours) * 60) + (Number(minutes));
  return goalInMinutes;
}

const GoalForTheDayForm = ({
  onChangeGoal, hours, minutes
}) => {
  const [state, setState] = React.useState({
    text0: {
      children: 'Goal For The Day',
      variant: 'medium',
    },
    maskedTextField0: {
      className: classNames.textField,
      content: 'A value between 00 and 24.',
      mask: '99',
      label: 'Hours',
      onClick: onClickSelection,
      onRenderLabel,
      errorMessage: ''
    },
    maskedTextField1: {
      className: classNames.textField,
      content: 'A value between 00 and 59.',
      mask: '99',
      label: 'Minutes',
      onClick: onClickSelection,
      onRenderLabel
    }
  });

  const updateErrorMessageOnMinutes = React.useMemo(() => {
    return _debounce((errorMessage) => {
      setState(currentState => {
        const updatedState = _set(
          {...currentState},
          'maskedTextField1.errorMessage',
          errorMessage
        )
        return updatedState;
      })
    }, 800);
  }, [])

  const debounceUpdateTextField0 = React.useMemo(() => {
    return _debounce((update) => {
      setState(currentState => ({
        ...currentState,
        maskedTextField0: {
          ...currentState.maskedTextField0,
          ...update
        }
      }))
    }, 800);
  }, []);

  const updateTextField0 = React.useCallback((update) => {
    setState(currentState => ({
      ...currentState,
      maskedTextField0: {
        ...currentState.maskedTextField0,
        ...update
      }
    }))
  },[])

  const goalForTheDayForm = {
    form: {
      onSubmit: React.useCallback((evt) => {
        evt.preventDefault();
        evt.stopPropagation();
      },[])
    },
    text0: {
      ...state.text0
    },
    maskedTextField0: {
      value: hours,
      ...state.maskedTextField0,
      onChange: React.useCallback((evt, hours) => {
        const isValid = isInRange({
          min: 0,
          max: 24,
          value: hours
        })
        if(isValid) {
          debounceUpdateTextField0.cancel();
          updateTextField0({
            errorMessage: '',
          })
          onChangeGoal({
            hours
          })
        } else {
          debounceUpdateTextField0({
            errorMessage: '00 - 24',
          })
        }
      },[debounceUpdateTextField0, updateTextField0, onChangeGoal])
    },
    maskedTextField1: {
      value: minutes,
      ...state.maskedTextField1,
      onChange: React.useCallback((evt, value) => {
        const isValid = isInRange({
          min: 0,
          max: 59,
          value
        })
        if(isValid) {
          onChangeGoal({
            minutes: value
          })
          updateErrorMessageOnMinutes('');
        } else {
          updateErrorMessageOnMinutes('00 - 59')
        }
      }, [updateErrorMessageOnMinutes, onChangeGoal])
    }
  }

  /**
    Disable Minutes-text-field when 24 hours set
  */
  React.useEffect(() => {
    const is24 = Number(hours) === 24;
    setState(currentState => ({
      ...currentState,
      maskedTextField1: {
        ...currentState.maskedTextField1,
        disabled: is24,
      }
    }))
    if(is24) {
      onChangeGoal({
        minutes: '00'
      })
    }
  }, [hours, onChangeGoal])

  return (
    <GoalForTheDayFormLayout {...goalForTheDayForm} />
  )
}

GoalForTheDayForm.propTypes = {
  onChangeGoal: PropTypes.func,
  hours: PropTypes.string,
  minutes: PropTypes.string
}

GoalForTheDayForm.defaultProps = {
    hours: '09',
    minutes: '02'
}

export default React.memo(GoalForTheDayForm)
