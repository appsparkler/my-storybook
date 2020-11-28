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
  placeholder, submitButtonText, fieldValue,
  onSubmit, onChangeField, disabled
}) => {
  const punchCardForm = {
    textField0: {
      placeholder,
      onChange: onChangeField,
      value: fieldValue
    },
    iconButton0: {
      type:"submit",
      className:"ms-hiddenMdUp",
      iconProps:{
        iconName: 'Add'
      },
      disabled,
      title: submitButtonText
    },
    primaryButton0: {
      className:"ms-hiddenSm",
      type:"submit",
      iconProps:{
        iconName: 'Add'
      },
      text: submitButtonText,
      title: submitButtonText,
      disabled
    },
    form: {

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
