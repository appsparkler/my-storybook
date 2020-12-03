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
Template.parameters = {
  viewport: {
    defaultViewport: 'mobile1'
  }
}

export const SmallMobile = Template.bind({});
SmallMobile.args = {
  ...Template.args
};
SmallMobile.parameters = {
  ...Template.parameters
}

export const WithError = Template.bind({});
WithError.args = {
  ...Template.args,
  errorMessage: 'Oops!'
}
WithError.parameters = {
  ...SmallMobile.parameters
}

export const Desktop = Template.bind({});
Desktop.args = {
  ...Template.args
};

export default Story
