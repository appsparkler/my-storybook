import React from 'react'
import PropTypes from 'prop-types'
import {Stack, DatePicker, MaskedTextField,
Checkbox}from '@fluentui/react'
import moment from 'moment'

const DateTimeForm = ({
  timeField,
  dateField
}) => (
  <Stack tokens={{childrenGap: 10}}>
    <Stack horizontal tokens={{childrenGap: 10}}>
      <Stack.Item>
        <DatePicker
          label="Date"
          {...dateField}
        />
      </Stack.Item>
      <Stack.Item>
        <MaskedTextField
          label="Time"
          mask="99:99"
          {...timeField}
        />
      </Stack.Item>
    </Stack>
    <Stack>
      <Stack.Item>
        <Checkbox label="Is end of time?"/>
      </Stack.Item>
    </Stack>
  </Stack>
)

DateTimeForm.propTypes = {
  timeField: PropTypes.object,
  dateField: PropTypes.object
}

DateTimeForm.defaultProps = {
  timeField: {
    value: moment().format('HH:mm')
  },
  dateField: {
    value: new Date()
  },
}

export default React.memo(DateTimeForm)
