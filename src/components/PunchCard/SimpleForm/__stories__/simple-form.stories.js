import React from 'react'
import SimpleForm from '../'

export default {
  title: 'Components/Simple Form',
  component: SimpleForm
}

const Template = (args) => <SimpleForm {...args} />

export const Default = Template.bind({});
Default.args = {
  form: {

  },
  textField: {
    placeholder: 'Punch Card Name...'
  },
  primaryButton: {
    text: 'Submit',
    type: 'submit'
  }
}
