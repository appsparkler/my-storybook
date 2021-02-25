import React from 'react'
import { TextField, Stack } from '@fluentui/react'

export const useTimezoneField = () => {
  const timezoneTextField = React.useMemo(
    () => ({
      placeholder: 'Select Timezone',
      onChange: (evt, ...args) => {},
      onClick: (evt) => {
        evt.target.select(0, 99999)
      },
    }),
    []
  )

  return timezoneTextField
}

const TimezoneField = ({ isDisabled }) => {
  const timezoneField = useTimezoneField()
  return (
    <Stack>
      <TextField disabled={isDisabled} {...timezoneField} />
    </Stack>
  )
}

export default TimezoneField
