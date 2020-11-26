import React from 'react';
import PropTypes from 'prop-types';
import {
  Stack, TextField, PrimaryButton
} from '@fluentui/react'

export const SimpleForm = ({
  form, textField, primaryButton,
  onSubmit
}) => {
  const handleSubmit = React.useCallback((evt)=> {
    evt.preventDefault();
    onSubmit(evt)
  },[onSubmit]);
  return (
    <Stack horizontal tokens={{childrenGap: 10}}>
      <form onSubmit={handleSubmit} {...form} >
        <Stack horizontal tokens={{childrenGap: 10}}>
          <TextField
            {...textField}
          />
          <PrimaryButton
            {...primaryButton}
          />
        </Stack>
      </form>
    </Stack>
  )
};

SimpleForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  form: PropTypes.object,
  textField: PropTypes.object,
  primaryButton: PropTypes.object,
};

SimpleForm.defaultProps = {
  form: {},
  textField: {},
  primaryButton: {},
}

export default React.memo(SimpleForm);
