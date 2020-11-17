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
    width: '50% !important',
    '.ms-FocusZone': {
      outline: '1px blue solid'
    },
    '.ms-DetailsHeader-cell': {
      width: '50%',
      outline: '1px blue solid'
    }
  },
  detailsList: {
    '.ms-DetailsHeader-cell': {
      width: '50% !important'
    }
  }
})

const Template = (args) => <PunchCard {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'My Punch Card',
  primaryButton: {
    text: 'Punch In'
  },
  primaryButton1: {
    text: 'Add Scheduled Slot'
  },
  detailsList: {
    className: classNames.detailsList,
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
      name: 'In Time',
      styles: {
        root: {

        }
      },
      fieldName: 'punchInTime',
      className: classNames.test,
      isResizable: false,
      onRender: ({punchInTime}) => {
        return <TextField
          value={punchInTime}
        />
      }
    },{
      id: '1233',
      key: 'punch-out-time',
      name: 'Out Time',
      minWidth: 70,
      maxWidth: 100,
      fieldName: 'punchOutTime',
      className: classNames.test,
      isResizable: false,
      onRender: ({punchOutTime}) => {
        return <TextField
          value={punchOutTime}
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
