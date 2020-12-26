import React from 'react'
import GAuthWrapper from '../'

const Story = {
  title: 'Apps/Google Auth Wrapper',
  component: GAuthWrapper
}

export const Template = (args) => <GAuthWrapper {...args} />
Template.args = {
  client_id: '35438095075-tj30lqt6be6d4svr0m0mfm2ufqpotd2k.apps.googleusercontent.com'
}

export default Story
