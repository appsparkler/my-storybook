import React from 'react'
import CustomLabelVariantA from '../variantA'

export default {
  title: 'Components/Custom Label - Variant A',
  component: CustomLabelVariantA
}

const Template = (args) => <CustomLabelVariantA {...args} />

export const Default = Template.bind({});
Default.args = {
  label: 'Timestamp',
  content: 'Example content.'
}
