import React from 'react'
import { TextField, Stack, mergeStyleSets, Callout } from '@fluentui/react'
import { useId } from '@fluentui/react-hooks'
import List from '../List'

export const useTextFieldWithCallout = () => {
  const [{ isCalloutHidden }, setState] = React.useState({
    isCalloutHidden: true,
  })
  const textFieldId = useId()

  const button = React.useMemo(
    () => ({
      onClick: () => {
        setState((currentState) => ({
          ...currentState,
          isCalloutHidden: Boolean(!currentState.isCalloutHidden),
        }))
      },
    }),
    []
  )

  const callout = React.useMemo(
    () => ({
      target: `#${textFieldId}`,
      hidden: isCalloutHidden,
      onDismiss: () => {
        setState((currentState) => ({
          ...currentState,
          isCalloutHidden: true,
        }))
      },
      styles: {
        root: {
          minWidth: 300,
        },
      },
      coverTarget: false,
      isBeakVisible: false,
      gapSpace: 2,
    }),
    [textFieldId, isCalloutHidden]
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

  return { textField, callout, button }
}

const TextFieldWithCallout = ({ isDisabled }) => {
  const { callout, textField, button } = useTextFieldWithCallout()

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
      <button {...button}>toggle</button>
    </Stack>
  )
}

export default TextFieldWithCallout
