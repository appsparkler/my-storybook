import React from 'react'
import {
  MaskedTextField, Stack,
  Text, mergeStyleSets
} from '@fluentui/react'
import _set from 'lodash/set'
import _debounce from 'lodash/debounce'
import CustomLabel from '../../../components/CustomLabel/variantA'

export const GoalForTheDayFormLayout = ({
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

export const GoalForTheDayForm = ({
  onSubmit
}) => {
  const [state, setState] = React.useState({
    text0: {
      children: 'Goal For The Day',
      variant: 'medium',
    },
    maskedTextField0: {
      className: classNames.textField,
      content: 'A value between 0 and 24.',
      mask: '99',
      value: '09',
      label: 'Hours',
      onClick: onClickSelection,
      onRenderLabel,
      errorMessage: ''
    },
    maskedTextField1: {
      className: classNames.textField,
      content: 'A value between 0 and 59.',
      mask: '99',
      value: '00',
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

  const updateMinutes = React.useCallback((minutes) => {
    setState(currentState => {
      const updatedState = _set(
        {...currentState},
        'maskedTextField1.minutes',
        minutes
      );
      return updatedState;
    })
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
      ...state.maskedTextField0,
      onChange: React.useCallback((evt, hours) => {
        const isValid = isInRange({
          min: 0,
          max: 59,
          value: hours
        })
        if(isValid) {
          updateMinutes(hours);
          updateErrorMessageOnMinutes('');
        } else {
          updateErrorMessageOnMinutes('00 - 12')
        }
      },[updateMinutes, updateErrorMessageOnMinutes])
    },
    maskedTextField1: {
      ...state.maskedTextField1,
      onChange: React.useCallback((evt, value) => {
        const isValid = isInRange({
          min: 0,
          max: 59,
          value
        })
        if(isValid) {
          updateMinutes(value);
          updateErrorMessageOnMinutes('');
        } else {
          updateErrorMessageOnMinutes('00 - 59')
        }
      }, [updateErrorMessageOnMinutes, updateMinutes])
    }
  }

  return (
    <GoalForTheDayFormLayout {...goalForTheDayForm} />
  )
}

export default React.memo(GoalForTheDayForm)
