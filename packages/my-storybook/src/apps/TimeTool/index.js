import React from 'react'
import { Stack, Text, DefaultButton, TextField } from '@fluentui/react'
import DateTimeForm from '../../components/DateTimeForm'

/*
Functionalities from the TimeTool App
1. Convert time to timestamp for any timezone.
2. Convert timestamp to time in any timezone.
3. Get time of one timezone into another timezone.
*/

const TimeTool = ({
  dateTimeForm,
  copyTextField,
  onClickClearStorage,
  timestampTextField,
}) => (
  <Stack tokens={{ childrenGap: 10, padding: 10 }}>
    <Text variant="xxLarge">Time Tool</Text>
    <Text>1. Convert date & time for any timezone into a timestamp.</Text>
    <DateTimeForm {...dateTimeForm} />
    <Stack horizontal verticalAlign="end" tokens={{ childrenGap: 10 }}>
      <Stack.Item>
        <TextField {...copyTextField} />
      </Stack.Item>
      <Stack.Item>
        <DefaultButton
          iconProps={{ iconName: 'Trash' }}
          onClick={onClickClearStorage}
          text="Clear Local Storage"
        />
      </Stack.Item>
    </Stack>
    <Stack.Item>
      <Text>
        2. Convert a timestamp to date in the time-zone selected above.
      </Text>
    </Stack.Item>
    <Stack.Item>
      <TextField {...timestampTextField} />
    </Stack.Item>
  </Stack>
)

export default React.memo(TimeTool)
