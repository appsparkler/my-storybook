import React from 'react'
import PunchCard  from '../'
import {TextField, SelectionMode} from '@fluentui/react'

export default {
  component: PunchCard,
  title: 'Components/Punch Card'
}

const Template = (args) => <PunchCard {...args} />

export const Default = Template.bind({})
Default.args = {
  primaryButton: {
    text: 'Punch In'
  },
  detailsList: {
    selectionMode: SelectionMode.none,
    items: [
      {
        id: '1234',
        punchInTime: '06:00',
        punchOutTime: '06:40',
      },
      {
        punchInTime: '08:00',
        punchOutTime: '09:00',
      }
    ],
    columns: [{
      id: '1243',
      key: 'punch-in-time',
      name: 'Punch In Time',
      fieldName: 'punchInTime',
      minWidth: 150,
      maxWidth: 150,
      isResizable: true,
      onRender: ({punchInTime}) => {
        return <TextField value={punchInTime}
          styles={{
            root: {
              maxWidth: '100%'
            }}}
        />
      }
    },{
      key: 'punch-out-time',
      styles: {
        root: {
          maxWidth: 150,
          outline: '1px blue solid'
        }
      },
      name: 'Punch Out Time',
      fieldName: 'punchOutTime',
      minWidth: 150,
      maxWidth: 150,
      isResizable: true,
      onRender: ({punchOutTime}) => {
        return <TextField
          value={punchOutTime}
          styles={{
            root: {
              maxWidth: '100%',
              outline: '1px blue solid'
            }}}
          />
      }
    }],
  },
  progressIndicator1: {
    label:"Punched",
    percentComplete: .4,
    barHeight: 20,
  },
  progressIndicator2: {
    label:"Scheduled",
    percentComplete: .2,
    barHeight: 20,
  }
}
