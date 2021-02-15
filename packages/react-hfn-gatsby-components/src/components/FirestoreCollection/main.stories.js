import React from 'react'
import FirestoreCollection from '.'

const Story = {
  title: 'Components/Firestore Collection',
  component: FirestoreCollection,
}

export default Story

const Template = (args) => <FirestoreCollection {...args} />
Template.args = {
  collectionPath: 'uploadedFiles',
}

export const Example = Template.bind({})
Example.args = {
  ...Template.args,
}
