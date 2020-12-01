import React from 'react'
import PunchInTimeCell from '../'
import moment from 'moment'

const Story = {
  title: 'Apps/Punch Card App/Punch Card/Punch-In-Time-Cell',
  component: PunchInTimeCell
}

const FORMAT = 'YYYY-MM-DD HH:mm'

const Template = (args) => <PunchInTimeCell {...args} />
Template.args = {
  value: moment().format(FORMAT)
};

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
