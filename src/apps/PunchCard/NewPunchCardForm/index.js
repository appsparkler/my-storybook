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

export const NewPunchCardForm = ({
  onAddPunchCard
}) => {
  const [state, setState] = React.useState({
    textField0: {
      value: '',
      placeholder: "Punch Card Name...",
    },
    iconButton0: {
      className: 'ms-hiddenMdUp',
      disabled: true,
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
      disabled: true
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
    },
    primaryButton0: {
      ...state.primaryButton0
    },
    form: {
      onSubmit: React.useCallback((evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        const formElem = evt.target
        const formData = new FormData(formElem);
        console.log({formData});
      },[])
    }
  };

  return (
    <NewPunchCardFormLayout {...punchCardForm} />
  )
}

NewPunchCardForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  submitButtonText: PropTypes.string,
  fieldValue: PropTypes.string,
  onChangeField: PropTypes.func.isRequired,
};

NewPunchCardForm.defaultProps = {
  form: {},
  textField: {},
  primaryButton: {},
}

export default React.memo(NewPunchCardForm);
