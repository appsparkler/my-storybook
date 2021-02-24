import React from 'react'
import { Customizer, Stack, Text } from '@fluentui/react'
import { FluentCustomizations } from '@uifabric/fluent-theme'

function CustomizedComponent() {
  return (
    <Customizer {...FluentCustomizations}>
      <Stack>
        <Text variant="medium">Hello World</Text>
      </Stack>
    </Customizer>
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
