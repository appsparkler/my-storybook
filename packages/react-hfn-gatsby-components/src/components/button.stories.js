import React from 'react'

const Story = {
  title: 'test/button',
}

const Template = ({ label, ...args }) => <button {...args}>{label}</button>
Template.args = {
  label: 'Test',
  onClick: () => alert('hello'),
}

export const Example = Template.bind({})
Example.args = Template.args

export default Story
