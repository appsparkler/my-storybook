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

const handleClick = (evt) => {
  const elem = evt.target;
  elem.select();
  elem.select(0, 99999);
}

export const isValidMinutes = ({
  minutes
}) => {
  const isDone = Boolean(!String(minutes).match(/_/));
  if(isDone) {
    const sanitizedMinutes = Number(minutes, 10);
    const isGreaterThan59 = sanitizedMinutes > 59;
    const isLessThan0 = sanitizedMinutes < 0
    if(isGreaterThan59 || isLessThan0) return false;
    return true;
  }
  return false;
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
      onClick: handleClick,
      onRenderLabel,
      errorMessage: ''
    },
    maskedTextField1: {
      className: classNames.textField,
      content: 'A value between 0 and 59.',
      mask: '99',
      value: '00',
      label: 'Minutes',
      onClick: handleClick,
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
      ...state.maskedTextField0
    },
    maskedTextField1: {
      ...state.maskedTextField1,
      onChange: React.useCallback((evt, minutes) => {
        const isValid = isValidMinutes({
          minutes
        })
        if(isValid) {
          updateMinutes(minutes);
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
