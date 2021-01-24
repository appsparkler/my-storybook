import React from 'react'
import Mark from '.'

const Story = {
  title: 'components/Mark',
  component: Mark
}

const Template = (args) => (
  <Mark {...args}>
    {args.children}
  </Mark>
)
Template.args = {
  children: 'Hello World',
  mark: 'o',
}

export const String = Template.bind({});
String.args = { ...Template.args }

export const RegExp = Template.bind({});
RegExp.args = {
  ...Template.args,
  type: 'markRegExp',
  mark: /l/
}

export const Ranges = Template.bind({});
Ranges.args = {
  ...Template.args,
  children: '0123456789',
  type: 'markRanges',
  mark: [{
    start: 1,
    length: 3
  },{
    start: 6,
    length: 4
  }],
}

export default Story
