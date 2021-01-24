import React from 'react'
import DigitalClock from '../index.jsx'

const Story = {
  title: 'Apps/Time Tool/Digital Clock',
  component: DigitalClock
}

const Template = (args) => <DigitalClock {...args} />
Template.args = {

}

export const Example = Template.bind({});
Example.args = {...Template.args};

export default Story;
