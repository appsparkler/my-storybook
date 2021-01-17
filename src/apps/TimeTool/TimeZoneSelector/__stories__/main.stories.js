import React from 'react'
// import PropTypes from 'prop-types'
import {
  mergeStyleSets, TextField,
  Callout,Stack
} from '@fluentui/react'
import { useId } from '@fluentui/react-hooks'

const styles = mergeStyleSets({
  callout: {
    maxWidth: 300,
    minWidth: 300
  }
})

const TimeZoneSelector = () => {
  const [state, setState] = React.useState({
    showCallout: false
  })

  const textField = {
    placeholder: 'Select Timezone',
    className: '.test',
    id: useId('timezone-selector')
  }

  const onClick = React.useCallback(() => {
    setState(currentState => ({
      ...currentState,
      showCallout: true
    }))
  },[])

  const callout = {
    className:styles.callout,
    onDismiss:React.useCallback(() => {
      setState(currentState => ({
        ...currentState,
        showCallout: false
      }))
    },[]),
    target: React.useMemo(() => `#${textField.id}`, [textField.id]),
    isBeakVisible: true,
    gapSpace: 0,
    setInitialFocus: false
  }

  return (
    <Stack vertical>
      <button onClick={onClick}>Show Callout</button>
      <TextField
        {...textField}
      />
      {state.showCallout && (
        <Callout
          {...callout}
        >
            <h1>TimeZone Callout</h1>
        </Callout>
      )}

      <pre>{JSON.stringify({state}, null, 2)}</pre>
    </Stack>
  )
}

TimeZoneSelector.propTypes = {

}

const Story = {
  title: 'Apps/Time Tool',
  component: TimeZoneSelector
}

export const Example = (args) => <TimeZoneSelector {...args} />
Example.storyName = "Time Zone Selector"
Example.args = {

}

export default Story;
