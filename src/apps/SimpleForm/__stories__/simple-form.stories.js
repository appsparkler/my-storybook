import React from 'react'
import SimpleForm from '../'

export default {
  title: 'Forms/Punch Card Form',
  component: SimpleForm
}

const Template = (args) => <SimpleForm {...args} />

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
