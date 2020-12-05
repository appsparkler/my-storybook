import React from 'react';
import PropTypes from 'prop-types';
import {
  Stack, TextField, PrimaryButton,
  IconButton
} from '@fluentui/react'

const NewPunchCardFormLayout = ({
  textField0, iconButton0, primaryButton0,
  form
}) => (
  <form {...form}>
    <Stack horizontal tokens={{childrenGap: 10}}>
      <TextField
        {...textField0}
      />
      <IconButton
        {...iconButton0}
      />
      <PrimaryButton
        {...primaryButton0}
      />
    </Stack>
  </form>
)

const NewPunchCardForm = ({
  onSubmit
}) => {
  const [state, setState] = React.useState({
    textField0: {
      value: '',
      placeholder: "Punch Card Name...",
    },
    iconButton0: {
      type: 'submit',
      className: 'ms-hiddenMdUp',
      title: 'Add Punch Card',
      iconProps:{
        iconName: 'Add'
      },
    },
    primaryButton0: {
      className:"ms-hiddenSm",
      type:"submit",
      iconProps:{
        iconName: 'Add'
      },
      text: 'Add Punch Card',
      title: 'Add Punch Card',
    }
  });

  const updateTextField0 = React.useCallback((evt, value) => {
    setState(currentState => ({
      ...currentState,
      textField0: {
        ...currentState.textField0,
        value
      }
    }))
  },[])

  const punchCardForm = {
    textField0: {
      ...state.textField0,
      onChange: updateTextField0,
    },
    iconButton0: {
      ...state.iconButton0,
      disabled: !state.textField0.value.trim(),
    },
    primaryButton0: {
      ...state.primaryButton0,
      disabled: !state.textField0.value.trim()
    },
    form: {
      onSubmit: React.useCallback((evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        onSubmit(state.textField0.value);
        updateTextField0(null, '');
      },[state.textField0.value, onSubmit, updateTextField0])
    }
  };

  return (
    <NewPunchCardFormLayout {...punchCardForm} />
  )
}

NewPunchCardForm.propTypes = {
  onSubmit: PropTypes.func
};

export default React.memo(NewPunchCardForm);
