import React from 'react'
import PropTypes from 'prop-types'
import {
  Stack, DatePicker, MaskedTextField,
  Dropdown, Checkbox
} from '@fluentui/react'
import moment from 'moment'

const DateTimeForm = ({
  timeField,
  dateField,
  endOfTimeCheckbox, timezoneDropdown
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
    <Stack
      vertical
      verticalAlign=""
      tokens={{childrenGap: 10}}
    >
      <Stack.Item>
        <Dropdown
          label="Timezone"
          placeholder="Select Timezone..."
          {...timezoneDropdown}
        />
      </Stack.Item>
      <Stack.Item>
        <Checkbox
        label="Is end of time?"
        {...endOfTimeCheckbox}
        />
      </Stack.Item>
    </Stack>
  </Stack>
)

DateTimeForm.propTypes = {
  timeField: PropTypes.object,
  dateField: PropTypes.object,
  endOfTimeCheckbox: PropTypes.object,
  timezoneDropdown: PropTypes.object,
}

DateTimeForm.defaultProps = {
  timeField: {
    value: moment().format('HH:mm')
  },
  dateField: {
    value: new Date()
  },
  endOfTimeCheckbox: {},
  timezoneDropdown: {},
}

export default React.memo(DateTimeForm)
