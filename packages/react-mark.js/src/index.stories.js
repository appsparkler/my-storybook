import React from 'react'
import Mark from '.'

const Story = {
  title: 'Mark',
  component: Mark
}

const Template = (args) => (
  <Mark {...args}>
    {args.children}
  </Mark>
)
Template.args = {
  children: 'Hello World',
  mark: 'or',
}

export const Example = Template.bind({});
Example.args = { ...Template.args }

export default Story
