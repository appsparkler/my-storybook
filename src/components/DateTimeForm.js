import React from 'react'
import PropTypes from 'prop-types'
import {Stack, DatePicker, MaskedTextField}from '@fluentui/react'
import moment from 'moment'

const DateTimeForm = ({
  timeField,
  dateField
}) => (
  <form>
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
  </form>
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
