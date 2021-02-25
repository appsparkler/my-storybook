import React from 'react'
import RegionDropdown from '..'

const Template = (args) => <RegionDropdown {...args} />
Template.args = {}

export const example = Template.bind({})
example.args = Template.args

const Story = {
  title: 'Apps/Time Tool/Timezone Selector/Region Dropdown',
  component: RegionDropdown,
}

export default Story
