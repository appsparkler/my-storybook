import React from 'react'
import PunchInTimeCell from '../'

const Story = {
  title: 'Components/Punch-In-Time-Cell',
  component: PunchInTimeCell
}

const Template = (args) => <PunchInTimeCell {...args} />
Template.args = {};

export const SmallMobile = Template.bind({});
SmallMobile.args = {
  ...Template.args
};
SmallMobile.parameters = {
  viewport: {
    defaultViewport: 'mobile1'
  }
}

export const Desktop = Template.bind({});
Desktop.args = {
  ...Template.args
};

export default Story
