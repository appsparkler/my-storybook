import React from 'react'
import TimezoneData from 'moment-timezone/data/meta/latest'

const { countries } = TimezoneData

export const Template = () => (
  <pre>{JSON.stringify({ countries }, null, 2)}</pre>
)
Template.args = {}

const Story = {
  title: 'apps/Time Tool/Time Zone Selector/Countries List',
}

export default Story
