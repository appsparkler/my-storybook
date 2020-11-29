import React from 'react'
import {
  MaskedTextField, Stack,
  Text, mergeStyleSets
} from '@fluentui/react'
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

export const GoalForTheDayForm = ({
  onSubmit
}) => {
  const goalForTheDayForm = {
    form: {
      onSubmit: React.useCallback((evt) => {
        evt.preventDefault();
        evt.stopPropagation();
      },[])
    },
    text0: {
      children: 'Goal For The Day',
      variant: 'medium'
    },
    maskedTextField0: {
      className: classNames.textField,
      content: 'A value between 0 and 24.',
      mask: '99',
      value: '09',
      label: 'Hours',
      onClick: handleClick,
      onRenderLabel
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
  }
  return (
    <GoalForTheDayFormLayout {...goalForTheDayForm} />
  )
}

export default React.memo(GoalForTheDayForm)
