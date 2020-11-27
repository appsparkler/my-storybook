import React from 'react';
import PropTypes from 'prop-types';
import {
  Stack, TextField, PrimaryButton,
  IconButton
} from '@fluentui/react'

export const SimpleForm = ({
  form, textField, primaryButton,

  placeholder, submitButtonText, fieldValue,
  onSubmit, onChangeField, disabled
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
          onChange={onChangeField}
          value={fieldValue}
        />
        <IconButton
          type="submit"
          className="ms-hiddenMdUp"
          iconProps={{
            iconName: 'Add'
          }}
          disabled={disabled}
          title={submitButtonText}
        />
        <PrimaryButton
          className="ms-hiddenSm"
          type="submit"
          iconProps={{
            iconName: 'Add'
          }}
          text={submitButtonText}
          title={submitButtonText}
          disabled={disabled}
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
  onChangeField: PropTypes.func.isRequired,

  // form: PropTypes.object,
  // textField: PropTypes.object,
  // primaryButton: PropTypes.object,
};

SimpleForm.defaultProps = {
  form: {},
  textField: {},
  primaryButton: {},
}

export default React.memo(SimpleForm);
