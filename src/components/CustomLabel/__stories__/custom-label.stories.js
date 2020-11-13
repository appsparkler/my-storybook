import React from 'react'
import CustomLabel from '../index'

export default {
  title: 'Components/Custom Label',
  component: CustomLabel
}

const Template = (args) => <CustomLabel {...args} />

export const Default = Template.bind({});
Default.args = {
  labelWrapperStack: {
    horizontal:  true,
    tokens: {
      // childrenGap:10
    }
  },
  label: 'Timestamp',
  iconButton: {
    iconProps: {
      iconName: 'Info'
    }
  }
}
