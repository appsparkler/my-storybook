import React from 'react'
import NewPunchCardForm from '../'

const Story = {
  title: 'Forms/New Punch Card Form',
  component: NewPunchCardForm
}

const Template = (args) => <NewPunchCardForm {...args} />

export const Default = Template.bind({});
Default.args = {
  placeholder: "Punch Card Name...",
  submitButtonText: 'Add Punch Card',

  textField: {
    placeholder: 'Punch Card Name...'
  },
  primaryButton: {
    text: 'Submit',
    type: 'submit'
  }
}

export default Story
