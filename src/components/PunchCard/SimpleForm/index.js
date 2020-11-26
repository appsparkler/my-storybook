import React from 'react';
import PropTypes from 'prop-types';
import {
  Stack, TextField, PrimaryButton,
  IconButton
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
    <form onSubmit={handleSubmit} {...form} >
      <Stack horizontal tokens={{childrenGap: 10}}>
        <TextField
          {...textField}
        />
        <IconButton
          type="submit"
          className="ms-hiddenMdUp"
          iconProps={{
            iconName: 'Add'
          }}
          onSubmit={handleSubmit}
        />
        <PrimaryButton
          className="ms-hiddenSm"
          {...primaryButton}
        />
      </Stack>
    </form>
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
