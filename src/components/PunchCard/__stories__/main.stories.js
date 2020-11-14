import React from 'react'
import PunchCard  from '../'
import {TextField, SelectionMode, DetailsListLayoutMode} from '@fluentui/react'
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';


export default {
  component: PunchCard,
  title: 'Components/Punch Card'
}

const classNames = mergeStyleSets({
  test: {
    minWidth: 150,
    maxWidth: 150
  }
})

const Template = (args) => <PunchCard {...args} />

export const Default = Template.bind({})
Default.args = {
  primaryButton: {
    text: 'Punch In'
  },
  detailsList: {
    styles: {
      root: {
        maxWidth: 300
      }
    },
    selectionMode: SelectionMode.none,
    layoutMode: DetailsListLayoutMode.justified,
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
      minWidth: 150,
      maxWidth: 150,
      // isPadded: true,
      className: classNames.test,
      styles: {
        root: {
          maxWidth:  150,
          minWidth: 150
        }
      },
      fieldName: 'punchInTime',
      isResizable: true,
      onRender: ({punchInTime}) => {
        return <TextField
          value={punchInTime}
          // styles={{root: {
            // display: 'inline-block'
          // }}}
        />
      }
    },{
      key: 'punch-out-time',
      name: 'Punch Out Time',
      fieldName: 'punchOutTime',
      className: classNames.test,
      minWidth: 150,
      maxWidth: 150,
      styles: {
        root: {
          minWidth: 150,
          maxWidth: 150
        }
      },
      // isPadded: true,
      isResizable: true,
      onRender: ({punchOutTime}) => {
        return <TextField
          value={punchOutTime}
          styles={{root: {
            width: '100%',
            outline: '1px blue solid',
            display: 'block'
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
