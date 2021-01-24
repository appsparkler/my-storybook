import React from 'react'
import Mark from '.'

const Story = {
  title: 'Mark',
  component: Mark
}

const Template = (args) => (
  <Mark>
    {args.children}
  </Mark>
)
Template.args = {
  children: 'Hello World',
}

export const Example = Template.bind({});
Example.args = { ...Template.args }

export default Story
