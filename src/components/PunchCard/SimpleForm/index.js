import React from 'react';
import PropTypes from 'prop-types';
import {
  Stack, TextField, PrimaryButton
} from '@fluentui/react'

export const SimpleForm = ({
  form, textField, primaryButton,
  onClick
}) => (
  <Stack horizontal tokens={{childrenGap: 10}}>
    <form {...form}>
      <Stack horizontal tokens={{childrenGap: 10}}>
        <TextField
          {...textField}
        />
        <PrimaryButton
          {...primaryButton}
        />
        <PrimaryButton onClick={onClick} text="Test" />
      </Stack>
    </form>
  </Stack>
);

SimpleForm.propTypes = {
  form: PropTypes.object,
  textField: PropTypes.object,
  primaryButton: PropTypes.object
};

SimpleForm.defaultProps = {
  form: {},
  textField: {},
  primaryButton: {}
}

export default React.memo(SimpleForm);
