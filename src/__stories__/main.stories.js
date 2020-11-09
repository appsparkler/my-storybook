import React from 'react'
import {Pivot, PivotItem, Label,Stack, Text } from '@fluentui/react'

export default {
  title: 'Test'
}

export const PivotTest = () => {
  const labelStyles = {
    root: { marginTop: 10 },
  }
  return (
    <Stack tokens={{padding: 10}}>
    <Pivot aria-label="Basic Pivot Example" className="ms-depth-8">
      <PivotItem
        headerText="Convert 2 Timestamp"
        headerButtonProps={{
          'data-order': 1,
          'data-title': 'My Files Title',
        }}
      >
        <Stack tokens={{padding: 10}}>
          <Text variant="xLarge">
            Convert 2 Timestamp
          </Text>
        </Stack>
      </PivotItem>
      <PivotItem headerText="Convert 2 Date">
        <Stack tokens={{padding: 10}}>
          <Label variant="xLarge">
            Convert 2 Date
          </Label>
          <Label styles={labelStyles}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Label>
        </Stack>
      </PivotItem>
    </Pivot>
    </Stack>
  )
}
