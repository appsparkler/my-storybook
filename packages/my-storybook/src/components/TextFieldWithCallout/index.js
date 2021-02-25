import React from 'react'
import { TextField, Stack, mergeStyleSets, Callout } from '@fluentui/react'
import { useId } from '@fluentui/react-hooks'
import List from '../List'

export const useTextFieldWithCallout = () => {
  const textFieldId = useId()

  const callout = React.useMemo(
    () => ({
      target: `#${textFieldId}`,
      styles: {
        root: {
          minWidth: 300,
        },
      },
      coverTarget: false,
      isBeakVisible: false,
      gapSpace: 2,
    }),
    [textFieldId]
  )

  const textField = React.useMemo(
    () => ({
      id: textFieldId,
      placeholder: 'Select Timezone',
      onChange: (evt, ...args) => {},
      onClick: (evt) => {
        evt.target.select(0, 99999)
      },
    }),
    [textFieldId]
  )

  return { textField, callout }
}

const TextFieldWithCallout = ({ isDisabled }) => {
  const { callout, textField } = useTextFieldWithCallout()

  return (
    <Stack>
      <TextField disabled={isDisabled} {...textField} />
      <Callout {...callout}>
        <List
          items={[
            {
              id: '1',
              mainText: 'America/New York',
              subText: 'NY',
            },
            {
              id: '2',
              mainText: 'America/Florida',
              subText: 'NY',
            },
          ]}
          onSelectItem={(item) => alert(JSON.stringify({ item }, null, 2))}
        />
      </Callout>
    </Stack>
  )
}

export default TextFieldWithCallout
