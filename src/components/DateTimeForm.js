import React from 'react'
import {Stack, DatePicker, MaskedTextField}from '@fluentui/react'

const DateTimeForm = () => (
  <Stack horizontal tokens={{childrenGap: 10}}>
    <Stack.Item>
      <DatePicker label="Date" />
    </Stack.Item>
    <Stack.Item>
      <MaskedTextField
        label="Time"
        mask="99:99"
      />
    </Stack.Item>
  </Stack>
)

export default React.memo(DateTimeForm)
