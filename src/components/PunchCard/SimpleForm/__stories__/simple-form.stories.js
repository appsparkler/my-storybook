import React from 'react'
import { SimpleForm } from '../'

export default {
  title: 'Components/Simple Form'
}

const Template = (args) => <SimpleForm {...args} />

export const Default = Template.bind({});
Default.args = {
  onClick: () => alert('clicked'),
  form: {
    // onSubmit: () => alert('submitting'),
  },
  textField: {
    // onChange: () => alert('changed'),
    placeholder: 'Punch Card Name...'
  },
  primaryButton: {
    text: 'Submit',
    type: 'submit'
  }
}
