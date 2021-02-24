import React from 'react'
import { Stack, Text } from '@fluentui/react'

function CustomizedComponent() {
  return (
    <Stack>
      <Text variant="medium">Hello World</Text>
    </Stack>
  )
}

const Template = (args) => {
  return <CustomizedComponent />
}
Template.args = {}

export const Example = Template.bind({})
Example.args = Template.args

const Story = {
  title: 'POC/Theming',
  component: CustomizedComponent,
}

export default Story
