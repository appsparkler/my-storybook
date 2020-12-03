import React from 'react'
import DetailsListWithText from '../'

const Story = {
  title: 'Tables/Details List With Text',
  component: DetailsListWithText
}

export const Template = (args) => <DetailsListWithText {...args} />
Template.args = {
  show: true,
  detailsList: {
    items: [{
      Name: 'foo'
    }, {
      Name: 'bar'
    }],
  },
  text: {
    children: 'Foo Bar'
  }
}
Template.parameters = {
  viewport: {
    defaultViewport: 'mobile1'
  }
}

export default Story
