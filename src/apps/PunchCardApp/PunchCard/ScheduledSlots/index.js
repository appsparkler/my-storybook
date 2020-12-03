import React  from 'react'
import {
  IconButton, SelectionMode,
  mergeStyleSets
} from '@fluentui/react'
import DetailsListWithText from '../../../../components/DetailsListWithText'
import DateTimeTextField from '../PunchInTimeCell'

const InTextField = ({inTextField}) => <DateTimeTextField {...inTextField}/>

const OutTextField = ({outTextField}) => <DateTimeTextField {...outTextField}/>

const classNames = mergeStyleSets({
  detailsList: {
    '.ms-DetailsList-headerWrapper': {
      '.ms-FocusZone.ms-DetailsHeader': {
        paddingTop: 0,
        '.ms-DetailsHeader-cell': {
          maxWidth: '40%',
          minWidth: '40%'
        }
      }
    },
    '.ms-DetailsRow-fields': {
      display: 'flex',
      '.ms-DetailsRow-cell': {
        maxWidth: '40%',
        minWidth: '40%'
      }
    }
  },
})

const ScheduledSlots = () => {
  const detailsListWithText = {
    show: true,
    detailsList: {
      className: classNames.detailsList,
      selectionMode: SelectionMode.none,
      columns: [{
        name: 'In Time',
        onRender: InTextField
      }, {
        name: 'Out Time',
        onRender: OutTextField
      },{
        name: '',
        onRender: () => <IconButton
          iconProps={{iconName: 'Trash'}}
        />
      }],
      items: [{
        id: '123',
        name: 'In Time',
        inTextField: {
          value: '2020-11-12 12:30'
        },
        outTextField: {
          value: '2020-11-12 13:30'
        },
      },{
        id: '124',
        inTextField: {
          value: '2020-11-12 11:30'
        },
        outTextField: {
          value: '2020-11-12 12:30'
        }
      }]
    },
    text: {}
  }
  return <DetailsListWithText {...detailsListWithText} />
}


export default React.memo(ScheduledSlots)
