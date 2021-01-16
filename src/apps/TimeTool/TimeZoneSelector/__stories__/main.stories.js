import React from 'react'
import PropTypes from 'prop-types'
import {TextField} from '@fluentui/react/lib/TextField'
import {Callout} from '@fluentui/react/lib/Callout'
import {Stack} from '@fluentui/react/lib/Stack'

const TimeZoneSelector = () => {
  const textField = {
    placeholder: 'Select Timezone',
    className: '.test'
  }
  return (
    <Stack horizontal>
      <TextField {...textField} />
      <Callout
        onDismiss={() => alert('dismissed')}
        target=".test"
        coverTarget
        isBeakVisible={false}
        gapSpace={0}
        setInitialFocus
      >
          <h1>TimeZone Callout</h1>
        </Callout>
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
