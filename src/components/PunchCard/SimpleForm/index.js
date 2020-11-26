import React from 'react';
import PropTypes from 'prop-types';
import {
  Stack, TextField, PrimaryButton,
  IconButton
} from '@fluentui/react'

export const SimpleForm = ({
  form, textField, primaryButton,

  placeholder, submitButtonText, fieldValue,
  onSubmit
}) => {
  const handleSubmit = React.useCallback((evt)=> {
    evt.preventDefault();
    onSubmit(evt)
  },[onSubmit]);
  return (
    <form onSubmit={handleSubmit}>
      <Stack horizontal tokens={{childrenGap: 10}}>
        <TextField
          placeholder={placeholder}
          value={fieldValue}
        />
        <IconButton
          type="submit"
          className="ms-hiddenMdUp"
          iconProps={{
            iconName: 'Add'
          }}
        />
        <PrimaryButton
          className="ms-hiddenSm"
          type="submit"
          iconProps={{
            iconName: 'Add'
          }}
          text={submitButtonText}
        />
      </Stack>
    </form>
  )
};

SimpleForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  submitButtonText: PropTypes.string,
  fieldValue: PropTypes.string,

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
